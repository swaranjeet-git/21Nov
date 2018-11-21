package com.pezitr.lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class LabApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(LabApplication.class, args);
	}
}
