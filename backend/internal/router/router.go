package router

import (
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/handler"
	"github.com/gin-gonic/gin"
)

func Setup(h *handler.Handler) *gin.Engine {
	router := gin.Default()
	router.GET("/api/users", h.GetAllUsers)
	router.POST("/api/users", h.CreateUser)
	return router
}
