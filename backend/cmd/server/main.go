package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Add(a, b int) int {
	return a + b
}

func main() {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello AZ-Tokyo",
		})
	})

	router.Run(":8080")
}
