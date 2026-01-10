package service

import (
	"context"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/repository"
)

type UserService interface {
	FindAll(ctx context.Context) ([]model.User, error)
	Create(ctx context.Context, user *model.User) error
	UpdateRecord(ctx context.Context, newUser model.User) error
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) FindAll(ctx context.Context) ([]model.User, error) {
	return s.repo.FindAll(ctx)
}

func (s *userService) Create(ctx context.Context, user *model.User) error {
	return s.repo.Create(ctx, user)
}

func (s *userService) UpdateRecord(ctx context.Context, user model.User) error {
	return s.repo.UpdateRecord(ctx, user)
}
