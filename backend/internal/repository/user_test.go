package repository

import (
	"testing"

	"github.com/AZ-Tokyo/AZ-Tokyo/backend/internal/model"
	"github.com/stretchr/testify/suite"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type UserRepositoryTestSuite struct {
    suite.Suite
    db   *gorm.DB
    repo UserRepository
}

func (s *UserRepositoryTestSuite) SetupTest() {
    db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
    s.NoError(err)
    db.AutoMigrate(&model.User{})
    s.db = db
    s.repo = NewUserRepository(db)
}

func (s *UserRepositoryTestSuite) TestFindAll_Success() {
    testUser := model.User{Name: "Test User"}
    s.db.Create(&testUser)

    users, err := s.repo.FindAll()

    s.NoError(err)
    s.Len(users, 1)
    s.Equal("Test User", users[0].Name)
}

func (s *UserRepositoryTestSuite) TestFindAll_Empty() {
    users, err := s.repo.FindAll()

    s.NoError(err)
    s.Len(users, 0)
}

func TestUserRepository(t *testing.T) {
    suite.Run(t, new(UserRepositoryTestSuite))
}
