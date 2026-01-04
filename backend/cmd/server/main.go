package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/handler"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/repository"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/router"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/service"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	ctx := context.Background()
	appEnv := os.Getenv("APP_ENV")

	var dsn string

	if appEnv == "production" {
		dbUser := os.Getenv("DB_USER")
		dbPass := os.Getenv("DB_PASSWORD")
		dbName := os.Getenv("DB_NAME")
		instanceConnectionName := os.Getenv("INSTANCE_CONNECTION_NAME")

		dsn = fmt.Sprintf("host=/cloudsql/%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=Asia/Tokyo",
			instanceConnectionName, dbUser, dbPass, dbName)
	} else {
		dsn = "host=localhost user=user password=password dbname=aztokyo port=5432 sslmode=disable TimeZone=Asia/Tokyo"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to setup database: %v", err)
	}

	if err := db.AutoMigrate(&model.User{}); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	userRepo := repository.NewUserRepository(ctx, db)
	userService := service.NewUserService(userRepo)
	h := handler.NewHandler(userService)

	r := router.Setup(h)
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
