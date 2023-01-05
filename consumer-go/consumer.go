package main

import (
	"context"
	"fmt"

	"github.com/segmentio/kafka-go"
)

func main() {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:   []string{"localhost:9092"},
		GroupID:   "consumer-group-id",
		Topic:     "demo",
		MinBytes:  10e3, // 10KB
		MaxBytes:  10e6, // 10MB
	})
	defer r.Close()
	fmt.Println("Consumer connected to Kafka")

	c := make(chan string)

	// start a goroutine to read messages from the topic
	go func() {
		for {
			m, err := r.ReadMessage(context.Background())
			if err != nil {
				break
			}
			c <- string(m.Value)
		}
		close(c)
	}()

	// consume messages from the channel
	for message := range c {
		fmt.Println(message)
	}
}