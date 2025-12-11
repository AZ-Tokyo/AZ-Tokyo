package main_test

import (
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestGetRoot(test *testing.T) {
	// "go run cmd/server/main.go" で先にサーバーを起動しておく
	response, err := http.Get("http://localhost:8080/")
	require.NoError(test, err)
	defer response.Body.Close()

	require.Equal(test, http.StatusOK, response.StatusCode)

	body, err := io.ReadAll(response.Body)
	require.NoError(test, err)

	var got map[string]string
	err = json.Unmarshal(body, &got)
	require.NoError(test, err)

	require.Equal(test, "Hello AZ-Tokyo", got["message"])
}

func TestGetIndex(test *testing.T) {
	// "go run cmd/server/main.go" で先にサーバーを起動しておく
	response, err := http.Get("http://localhost:8080/index")
	require.NoError(test, err)
	defer response.Body.Close()

	require.Equal(test, http.StatusOK, response.StatusCode)

	body, err := io.ReadAll(response.Body)
	require.NoError(test, err)

	var got map[string]string
	err = json.Unmarshal(body, &got)
	require.NoError(test, err)

	require.Equal(test, "Hello AZ-Tokyo", got["message"])
}
