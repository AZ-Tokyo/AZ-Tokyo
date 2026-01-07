package repository

import (
	"context"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"gorm.io/gorm"
)

type UserRepository interface {
	FindAll(ctx context.Context) ([]model.User, error)
	Create(ctx context.Context, user *model.User) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) FindAll(ctx context.Context) ([]model.User, error) {
	users, err := gorm.G[model.User](r.db).Find(ctx)
	return users, err
}

func (r *userRepository) Create(ctx context.Context, user *model.User) error {
	return gorm.G[model.User](r.db).Create(ctx, user)
}

func (r *userRepository) UpdateRecord(ctx context.Context, newUser model.User) error {
	_, err := gorm.G[model.User](r.db).Where("id = ?", newUser.ID).Updates(ctx, newUser)
	if err != nil {
		err = r.Create(ctx, &newUser)
	}
	return err
}
