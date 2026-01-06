package service

import (
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/repository"
)

type UserService interface {
	FindAll() ([]model.User, error)
	Create(user *model.User) error
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) FindAll() ([]model.User, error) {
	return s.repo.FindAll()
}

func (s *userService) Create(user *model.User) error {
	return s.repo.Create(user)
}
