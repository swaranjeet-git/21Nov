package com.pezitr.lab.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/hello")
public class ConnectionCheckController {
	
	
	public ConnectionCheckController(){
	}
	
	@GetMapping()	
	public ResponseEntity<Map<String, String>> get() {
		Map<String,String> res = new HashMap<String,String>();
		res.put("res", "Success");
		return new ResponseEntity<Map<String, String>>(res, HttpStatus.OK);
	}
}
