package service

import (
	"errors"
	"testing"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockUserRepository struct {
	mock.Mock
}

func (m *MockUserRepository) FindAll() ([]model.User, error) {
	args := m.Called()
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).([]model.User), args.Error(1)
}

func (m *MockUserRepository) FindByID(id uint) (*model.User, error) {
	args := m.Called(id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*model.User), args.Error(1)
}

func (m *MockUserRepository) Create(user *model.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func TestFindAll_Success(t *testing.T) {
	mockRepo := new(MockUserRepository)
	users := []model.User{{Name: "Test User"}}
	mockRepo.On("FindAll").Return(users, nil)

	service := NewUserService(mockRepo)
	result, err := service.FindAll()

	assert.NoError(t, err)
	assert.Equal(t, users, result)
	mockRepo.AssertExpectations(t)
}

func TestFindAll_Error(t *testing.T) {
	mockRepo := new(MockUserRepository)
	mockRepo.On("FindAll").Return(nil, errors.New("db error"))

	service := NewUserService(mockRepo)
	result, err := service.FindAll()

	assert.Error(t, err)
	assert.Nil(t, result)
	mockRepo.AssertExpectations(t)
}

func TestFindByID_Success(t *testing.T) {
	mockRepo := new(MockUserRepository)
	user := &model.User{Name: "Test User"}
	user.ID = 1
	mockRepo.On("FindByID", uint(1)).Return(user, nil)

	service := NewUserService(mockRepo)
	result, err := service.FindByID(1)

	assert.NoError(t, err)
	assert.Equal(t, user, result)
	mockRepo.AssertExpectations(t)
}

func TestFindByID_Error(t *testing.T) {
	mockRepo := new(MockUserRepository)
	mockRepo.On("FindByID", uint(1)).Return(nil, errors.New("not found"))

	service := NewUserService(mockRepo)
	result, err := service.FindByID(1)

	assert.Error(t, err)
	assert.Nil(t, result)
	mockRepo.AssertExpectations(t)
}

func TestCreate_Success(t *testing.T) {
	mockRepo := new(MockUserRepository)
	user := &model.User{Name: "New User"}
	mockRepo.On("Create", user).Return(nil)

	service := NewUserService(mockRepo)
	err := service.Create(user)

	assert.NoError(t, err)
	mockRepo.AssertExpectations(t)
}

func TestCreate_Error(t *testing.T) {
	mockRepo := new(MockUserRepository)
	user := &model.User{Name: "New User"}
	mockRepo.On("Create", user).Return(errors.New("db error"))

	service := NewUserService(mockRepo)
	err := service.Create(user)

	assert.Error(t, err)
	mockRepo.AssertExpectations(t)
}
