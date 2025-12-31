package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name string `gorm:"size:255" json:"name" binding:"required"`
	BirthDate *time.Time `json:"birth_date"`
	DeathDate *time.Time `json:"death_date"`
	LegalDomicile *string `gorm:"size:255" json:"legal_domicile"`
	LastAddress *string `gorm:"size:255" json:"last_address"`
	Remarks *string `gorm:"type:text" json:"remarks"`
}
