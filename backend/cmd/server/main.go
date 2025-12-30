package main

import (
	"fmt"
	"net/http"
	"os"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Add(a, b int) int {
	return a + b
}

type User struct {
	gorm.Model
	Name string `gorm:"size:255"`
}

func main() {
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
		panic("failed to connect database: " + err.Error())
	}

	if err := db.AutoMigrate(&User{}); err != nil {
		panic("Failed to migrate database: " + err.Error())
	}
	db.FirstOrCreate(&User{Name: "test_user"})

	var target User
	db.First(&target, "name = ?", "test_user")

	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello AZ-Tokyo",
		})
	})
	router.GET("/user", func(c *gin.Context) {
		var target User
		result := db.First(&target, "name = ?", "test_user")

		if result.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		c.JSON(http.StatusOK, target)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := router.Run(":" + port); err != nil {
		panic(err)
	}
}