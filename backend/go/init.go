package swagger

import "log"

type Client struct {
	Channel chan<- Body
}

var messagesChan chan Body
var addChan chan Client
var removeChan chan Client

func init() {
	messagesChan := make(chan Body)
	addChan := make(chan Client)
	removeChan := make(chan Client)

	go handleMessages(messagesChan, addChan, removeChan)
}

func handleMessages(messageChan <-chan Body, addChan <-chan Client, removeChan <-chan Client) {
	channels := make(map[Client]chan<- Body)

	for {
		select {
		case message := <-messageChan:
			log.Print("New message: ", message.Message)
			for _, channel := range channels {
				go func(c chan<- Body) {
					c <- message
				}(channel)
			}
		case client := <-addChan:
			log.Print("Client connected: ", client)
			channels[client] = client.Channel
		case client := <-removeChan:
			log.Print("Client disconnected: ", client)
			delete(channels, client)
		}
	}
}
