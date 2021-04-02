package controllers

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func GetMessages(rw http.ResponseWriter, r *http.Request, p httprouter.Params) {
	fmt.Fprintln(rw, "Get All Messages")
}

func GetMessagesController() *Controller {
	return &Controller{
		GetAll: GetMessages,
	}
}
