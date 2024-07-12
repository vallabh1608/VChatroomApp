package com.chat.app.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chat.app.models.Message;

@RestController
public class Msgcontroller {

	@MessageMapping("/message") //clients send message using this url
	@SendTo("/topic/return-to") //who got subscribed to this url receives message
	public Message getContent(@RequestBody Message message) {
		
		
		return message;
	}
}
