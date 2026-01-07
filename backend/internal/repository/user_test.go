package repository

import (
	"context"
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
	if err := db.AutoMigrate(&model.User{}); err != nil {
		panic("Failed to migrate database: " + err.Error())
	}

	s.db = db
	s.repo = NewUserRepository(db)
}

func (s *UserRepositoryTestSuite) TestFindAll_Success() {
	ctx := context.Background()
	testUser := model.User{Name: "Test User"}

	s.db.Create(&testUser)
	users, err := s.repo.FindAll(ctx)

	s.NoError(err)
	s.Len(users, 1)
	s.Equal("Test User", users[0].Name)
}

func (s *UserRepositoryTestSuite) TestFindAll_Empty() {
	ctx := context.Background()
	users, err := s.repo.FindAll(ctx)

	s.NoError(err)
	s.Len(users, 0)
}

func (s *UserRepositoryTestSuite) TestCreate_Success() {
	ctx := context.Background()
	user := &model.User{Name: "Yamada"}

	err := s.repo.Create(ctx, user)

	s.NoError(err)
	s.NotZero(user.ID)

	var dbUser model.User
	result := s.db.First(&dbUser, user.ID)
	s.NoError(result.Error)
	s.Equal("Yamada", dbUser.Name)
}

func (s *UserRepositoryTestSuite) TestCreate_Error() {
	ctx := context.Background()
	s.NoError(s.db.Migrator().DropTable(&model.User{}))

	user := &model.User{Name: "Error User"}
	err := s.repo.Create(ctx, user)

	s.Error(err)
}

func TestUserRepository(t *testing.T) {
	suite.Run(t, new(UserRepositoryTestSuite))
}
