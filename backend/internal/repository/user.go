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
	users, err := gorm.G[model.User](r.db).Find(r.ctx)
	return users, err
}

func (r *userRepository) Create(user *model.User) error {
	return gorm.G[model.User](r.db).Create(r.ctx, user)
}
