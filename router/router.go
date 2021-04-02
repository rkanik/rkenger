package router

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/rkanik/rkenger/controllers"
)

var router *httprouter.Router

func InitializeRoutes() *httprouter.Router {

	router = httprouter.New()
	mControllers := controllers.InitializeControllers()

	router.GET("/api/v1/messages", mControllers.Messages.GetAll)

	router.NotFound = http.FileServer(http.Dir("public"))

	return router
}
