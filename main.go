package main

import (
	"fmt"
	"log"
	"net/http"
)

const PORT = ":9000"

func main() {

	http.Handle("/", http.FileServer(http.Dir("public")))

	fmt.Println("\nServer Started...")
	fmt.Printf("http://localhost%s\n", PORT)
	log.Fatal(http.ListenAndServe(PORT, nil))
}
