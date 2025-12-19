package main

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestAdd(test *testing.T) {
	require.Equal(test, 5, Add(2, 3))
}
