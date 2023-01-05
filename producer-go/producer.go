package main

import (
	"context"
	"fmt"

	"github.com/segmentio/kafka-go"
)

func main() {
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers:  []string{"localhost:9092"},
		Topic:    "demo",
		Balancer: &kafka.LeastBytes{},
	})
 
	m := kafka.Message{
		Key:   []byte("Key-A"),
		Value: []byte("Uemura"),
	}

	err := w.WriteMessages(context.Background(), m)
	if err != nil {
		fmt.Println("Error writing message to topic:", err)
	}

	w.Close()
}
