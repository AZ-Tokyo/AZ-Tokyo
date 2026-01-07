package service

import (
	"context"
	"errors"
	"testing"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockUserRepository struct {
	mock.Mock
}

func (m *MockUserRepository) FindAll(ctx context.Context) ([]model.User, error) {
	args := m.Called(ctx)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).([]model.User), args.Error(1)
}

func (m *MockUserRepository) Create(ctx context.Context, user *model.User) error {
	args := m.Called(ctx, user)
	return args.Error(0)
}

func TestFindAll_Success(t *testing.T) {
	ctx := context.Background()

	mockRepo := new(MockUserRepository)
	users := []model.User{{Name: "Test User"}}
	mockRepo.On("FindAll", mock.Anything).Return(users, nil)

	service := NewUserService(mockRepo)
	result, err := service.FindAll(ctx)

	assert.NoError(t, err)
	assert.Equal(t, users, result)
	mockRepo.AssertExpectations(t)
}

func TestFindAll_Error(t *testing.T) {
	ctx := context.Background()

	mockRepo := new(MockUserRepository)
	mockRepo.On("FindAll", mock.Anything).Return(nil, errors.New("db error"))

	service := NewUserService(mockRepo)
	result, err := service.FindAll(ctx)

	assert.Error(t, err)
	assert.Nil(t, result)
	mockRepo.AssertExpectations(t)
}

func TestCreate_Success(t *testing.T) {
	ctx := context.Background()

	mockRepo := new(MockUserRepository)
	user := &model.User{Name: "New User"}
	mockRepo.On("Create", mock.Anything, user).Return(nil)

	service := NewUserService(mockRepo)
	err := service.Create(ctx, user)

	assert.NoError(t, err)
	mockRepo.AssertExpectations(t)
}

func TestCreate_Error(t *testing.T) {
	ctx := context.Background()

	mockRepo := new(MockUserRepository)
	user := &model.User{Name: "New User"}
	mockRepo.On("Create", mock.Anything, user).Return(errors.New("db error"))

	service := NewUserService(mockRepo)
	err := service.Create(ctx, user)

	assert.Error(t, err)
	mockRepo.AssertExpectations(t)
}
