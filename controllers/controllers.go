package controllers

import (
	"github.com/julienschmidt/httprouter"
)

type Controller struct {
	GetAll httprouter.Handle
}

type Controllers struct {
	Messages *Controller
}

func InitializeControllers() *Controllers {
	return &Controllers{
		Messages: GetMessagesController(),
	}
}
