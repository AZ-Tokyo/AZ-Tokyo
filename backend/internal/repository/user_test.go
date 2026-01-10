package repository

import (
	"context"
	"testing"
	"time"

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

	result, err := gorm.G[model.User](s.db).Where("id = ?", user.ID).First(ctx)
	s.NoError(err)
	s.Equal("Yamada", result.Name)
}

func (s *UserRepositoryTestSuite) TestCreate_Error() {
	ctx := context.Background()
	s.NoError(s.db.Migrator().DropTable(&model.User{}))

	user := &model.User{Name: "Error User"}
	err := s.repo.Create(ctx, user)

	s.Error(err)
}

func (s *UserRepositoryTestSuite) TestUpdateRecord_Success() {
	ctx := context.Background()
	jst := time.FixedZone("Asia/Tokyo", 9*60*60)

	/* Prepare user1 record */
	// initialize user1 object
	birthDate1 := time.Date(1960, time.September, 8, 15, 23, 00, 00, jst)
	deathDate1 := time.Date(2025, time.January, 26, 12, 00, 00, 00, jst)
	lastAddress1 := "神奈川県横浜市"
	user1 := &model.User{
		Name:          "Old 42Tokyo",
		BirthDate:     &birthDate1,
		DeathDate:     &deathDate1,
		LegalDomicile: &lastAddress1,
		LastAddress:   &lastAddress1,
		Remarks:       nil,
	}

	// Create user1 record in db
	err := s.repo.Create(ctx, user1)
	s.NoError(err)

	// Assert user1 and resultUser1
	resultUser1, err1 := gorm.G[model.User](s.db).Where("name = ?", user1.Name).First(ctx)
	s.NoError(err1)
	s.Equal(user1.Name, resultUser1.Name)
	s.True(user1.BirthDate.Equal(*resultUser1.BirthDate))
	s.True(user1.DeathDate.Equal(*resultUser1.DeathDate))
	s.Equal(user1.LegalDomicile, resultUser1.LegalDomicile)
	s.Equal(user1.LastAddress, resultUser1.LastAddress)

	/* Test Update user1 record */
	// Copy user1 to user2
	deathDate2 := time.Date(2019, time.April, 7, 21, 48, 00, 00, jst)
	user2 := *user1
	user2.ID = user1.ID
	user2.Name = "New 42Tokyo"
	user2.DeathDate = &deathDate2

	// Update user1 record with user2 data
	err = s.repo.UpdateRecord(ctx, user2)
	s.NoError(err)

	// Assert user2 and resultUser2
	resultUser2, err2 := gorm.G[model.User](s.db).Where("name = ?", user2.Name).First(ctx)
	s.NoError(err2)
	s.Equal(user2.Name, resultUser2.Name)
	s.True(user2.BirthDate.Equal(*resultUser2.BirthDate))
	s.True(user2.DeathDate.Equal(*resultUser2.DeathDate))
	s.Equal(user2.LegalDomicile, resultUser2.LegalDomicile)
	s.Equal(user2.LastAddress, resultUser2.LastAddress)

	// Assert resultUser1 and resultUser2
	s.NotEqual(resultUser1, resultUser2)
	s.NotEqual(resultUser1.Name, resultUser2.Name)
	s.Equal(resultUser1.BirthDate, resultUser2.BirthDate)
	s.NotEqual(resultUser1.DeathDate, resultUser2.DeathDate)
	s.Equal(resultUser1.LegalDomicile, resultUser2.LegalDomicile)
	s.Equal(resultUser1.LastAddress, resultUser2.LastAddress)
	s.Equal(resultUser1.Remarks, resultUser2.Remarks)
}

func (s *UserRepositoryTestSuite) TestUpdateRecord_Error() {
	ctx := context.Background()
	s.NoError(s.db.Migrator().DropTable(&model.User{}))

	user := model.User{Name: "New 42Tokyo"}

	err := s.repo.UpdateRecord(ctx, user)
	s.Error(err)
}

func TestUserRepository(t *testing.T) {
	suite.Run(t, new(UserRepositoryTestSuite))
}
