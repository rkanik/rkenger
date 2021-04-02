package mongodb

import (
	"os"
	"time"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type DB struct {
}

// Creating context
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

// Connecting to database
client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.GetEnv("MONGO_ATLAS")))
defer func() {
	if err = client.Disconnect(ctx); err != nil {
		panic(err)
	}
}()

func (db *DB) Connect() {

}
