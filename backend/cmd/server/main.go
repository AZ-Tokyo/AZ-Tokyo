package main

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/handler"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/repository"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/router"
)

func main() {
	dsn := "host=localhost user=user password=password dbname=aztokyo port=5432 sslmode=disable TimeZone=Asia/Tokyo"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to setup database: %v", err)
	}

	if err := db.AutoMigrate(&model.User{}); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	userRepo := repository.NewUserRepository(db)
	h := handler.NewHandler(userRepo)

	r := router.Setup(h)
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
