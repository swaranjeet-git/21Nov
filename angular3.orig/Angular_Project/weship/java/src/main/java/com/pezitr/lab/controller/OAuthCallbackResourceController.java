package com.pezitr.lab.controller;

import java.io.IOException;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.services.AndroidPushNotificationsService;
import com.pezitr.lab.services.GoogleAuthorizationService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/Callback")
public class OAuthCallbackResourceController {
	
	@Autowired
	ServletContext servletContext;
	
	@Autowired
	AndroidPushNotificationsService androidPushNotificationsService;
	@Autowired
	private GoogleAuthorizationService googleAuthorizationService;
	
	public OAuthCallbackResourceController(){
	}
	
	@GetMapping("/googleService")
	public ResponseEntity init(@RequestParam("uri") String uri) {
//		try {
			googleAuthorizationService.authorize(uri);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return new ResponseEntity(HttpStatus.NOT_FOUND);
//		}
		return new ResponseEntity(HttpStatus.OK);
	}
	@GetMapping()
	public ResponseEntity callback(@RequestParam("code") String authorizationCode) {
		googleAuthorizationService.exchangeAccessToken(authorizationCode);
//        return Response.seeOther(UriBuilder.fromResource(CalendarResource.class).build()).build();
        return new ResponseEntity(HttpStatus.OK);
    }
}
