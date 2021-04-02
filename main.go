package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/rkanik/rkenger/router"
)

const PORT = ":9000"

func main() {
	loadENV()
	handler := router.InitializeRoutes()
	log.Fatal(http.ListenAndServe(PORT, handler))
}

func loadENV() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
