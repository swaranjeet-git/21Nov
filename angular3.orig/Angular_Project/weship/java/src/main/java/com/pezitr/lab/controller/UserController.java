package com.pezitr.lab.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.User;
import com.pezitr.lab.repository.UserRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/user")
public class UserController {

	UserRepository userRepository;
	
	@Autowired
	SequenceIdService sequenceIdService;

	public UserController(UserRepository userRepository, SequenceIdService sequenceIdService) {
		super();
		this.userRepository = userRepository;
	}

	@GetMapping()
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@GetMapping("/{id}")
	public User getAll(@PathVariable(value = "id") String id) {
		return userRepository.findById(id);
	}

	@PostMapping()
	public @ResponseBody ResponseEntity<User> addUser(@RequestBody User user) throws Exception {
//		user.setId((int)sequenceIdService.getNext(user));
		return new ResponseEntity<User>(userRepository.insert(user), HttpStatus.CREATED);
	}
	
	@PutMapping("/token/{uID}")
	public @ResponseBody ResponseEntity<User> addUpdateUser(@PathVariable("uID") String uId, @RequestBody User user) throws Exception {
//		user.setId((int)sequenceIdService.getNext(user));
		User existingUser = userRepository.findByToken(user.getToken());
		if(existingUser==null)
		{
			existingUser = userRepository.findById(uId);
			if (existingUser!=null){
				existingUser.setToken(user.getToken());
				userRepository.save(user);
			} else
			{
				userRepository.insert(user);
			}
		}
		
		return new ResponseEntity<User>(user, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
		user.setId(id);

		return new ResponseEntity<User>(userRepository.save(user), HttpStatus.OK);

	}

	
	@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeUser(@PathVariable(value = "id") String id) {
		userRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
