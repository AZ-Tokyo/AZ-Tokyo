package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"net/http"
)

func Add(a, b int) int {
	return a + b
}

type User struct {
	gorm.Model
	Name string `gorm:"size:255"`
}

func main() {
	dsn := "host=localhost user=user password=password dbname=aztokyo port=5432 sslmode=disable TimeZone=Asia/Tokyo"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
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
	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
