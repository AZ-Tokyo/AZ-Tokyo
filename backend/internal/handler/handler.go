package handler

import (
	"net/http"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	UserService service.UserService
}

func NewHandler(userService service.UserService) *Handler {
	return &Handler{UserService: userService}
}

func (h *Handler) GetUsers(c *gin.Context) {
	users, err := h.UserService.FindAll()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, users)
}

func (h *Handler) CreateUser(c *gin.Context) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.UserService.Create(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}
