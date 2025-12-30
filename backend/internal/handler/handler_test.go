package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/gin-gonic/gin"
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

func TestGetUsers_Success(t *testing.T) {
    mockRepo := new(MockUserRepository)
    users := []model.User{
        {Name: "Test User"},
    }
    mockRepo.On("FindAll").Return(users, nil)

    handler := NewHandler(mockRepo)
    recorder := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(recorder)

    handler.GetUsers(c)

    // Status code の確認
    assert.Equal(t, http.StatusOK, recorder.Code)

    // レスポンスボディの確認
    var responseUsers []model.User
    json.Unmarshal(recorder.Body.Bytes(), &responseUsers)
    assert.Equal(t, users, responseUsers)

    mockRepo.AssertExpectations(t)
}

func TestGetUsers_Error(t *testing.T) {
    mockRepo := new(MockUserRepository)
    mockRepo.On("FindAll").Return(nil, errors.New("database error"))

    handler := NewHandler(mockRepo)
    recorder := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(recorder)

    handler.GetUsers(c)

    assert.Equal(t, http.StatusNotFound, recorder.Code)

    // エラーが返ってくることを確認
    var errorResponse map[string]interface{}
    json.Unmarshal(recorder.Body.Bytes(), &errorResponse)
    assert.Equal(t, "User not found", errorResponse["error"])

    mockRepo.AssertExpectations(t)
}
