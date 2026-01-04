package repository

import (
	"context"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"gorm.io/gorm"
)

type UserRepository interface {
	FindAll() ([]model.User, error)
	Create(user *model.User) error
}

type userRepository struct {
	ctx context.Context
	db  *gorm.DB
}

func NewUserRepository(ctx context.Context, db *gorm.DB) UserRepository {
	return &userRepository{
		ctx: ctx,
		db:  db,
	}
}

func (r *userRepository) FindAll() ([]model.User, error) {
	var users []model.User
	result := r.db.Find(&users)
	return users, result.Error
}

func (r *userRepository) Create(user *model.User) error {
	return r.db.Create(user).Error
}
