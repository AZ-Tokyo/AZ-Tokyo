package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model    `tstype:",extends,required"`
	Name          string `gorm:"size:255" binding:"required"`
	BirthDate     *time.Time
	DeathDate     *time.Time
	LegalDomicile *string `gorm:"size:255"`
	LastAddress   *string `gorm:"size:255"`
	Remarks       *string `gorm:"type:text"`
}
