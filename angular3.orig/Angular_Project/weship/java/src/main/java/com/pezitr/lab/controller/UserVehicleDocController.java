package com.pezitr.lab.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.UserVehicleDocument;
import com.pezitr.lab.repository.UserVehicleDocRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/uservehicledoc")
public class UserVehicleDocController {
	
	UserVehicleDocRepository userVehicleDocRepository ;
	
	@Autowired
	SequenceIdService sequenceIdService;
	
	public UserVehicleDocController(UserVehicleDocRepository userVehicleDocRepository){
		super();
		this.userVehicleDocRepository = userVehicleDocRepository;
	}
	
	@GetMapping()
	public List<UserVehicleDocument> getAll() {
		return userVehicleDocRepository.findAll();
	}

	@GetMapping("/{id}")
	public UserVehicleDocument getAll(@PathVariable(value = "id") Integer id) {
		return userVehicleDocRepository.findById(id);
	}

	@PostMapping()
	public @ResponseBody ResponseEntity<UserVehicleDocument> addUserVehicleDoc(@RequestBody UserVehicleDocument userVehicleDocument) throws Exception {
		userVehicleDocument.setId((int)sequenceIdService.getNext(userVehicleDocument));
		return new ResponseEntity<UserVehicleDocument>(userVehicleDocRepository.insert(userVehicleDocument), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<UserVehicleDocument> updateUserVehicleDoc(@PathVariable Integer id, @RequestBody UserVehicleDocument userVehicleDocument) {
		userVehicleDocument.setId(id);

		return new ResponseEntity<UserVehicleDocument>(userVehicleDocRepository.save(userVehicleDocument), HttpStatus.OK);

	}
	@PostMapping("/bulk")
	public @ResponseBody ResponseEntity<List<UserVehicleDocument>> addUserVehicleDocument(
			@RequestBody List<UserVehicleDocument> userVehicleDocumentList) throws Exception {
		userVehicleDocumentList.forEach(userVehicleDocument -> {
			try {
				userVehicleDocument.setId((int) sequenceIdService.getNext(userVehicleDocument));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			userVehicleDocRepository.insert(userVehicleDocument);
		});

		// domainObject = userVehicleDocumentRepository.insert(domainObject);
		return new ResponseEntity<List<UserVehicleDocument>>(userVehicleDocumentList, HttpStatus.CREATED);
	}


}
