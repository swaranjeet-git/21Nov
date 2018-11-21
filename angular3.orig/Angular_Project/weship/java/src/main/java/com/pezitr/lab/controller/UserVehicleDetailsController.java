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

import com.pezitr.lab.document.UserVehicleDetails;
import com.pezitr.lab.repository.UserVehicleDetailsRepository;
import com.pezitr.lab.repository.UserVehicleDocRepository;
import com.pezitr.lab.repository.VehicleMasterRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/vehicleDetails")

public class UserVehicleDetailsController {
	
	UserVehicleDetailsRepository userVehicleDetailsRepository;
	
	@Autowired
	UserVehicleDocRepository userVehicleDocRepository;
	@Autowired
	VehicleMasterRepository vehicleMasterRepository;
	@Autowired
	SequenceIdService sequenceIdService;
	
	public UserVehicleDetailsController (UserVehicleDetailsRepository userVehicleDetailsRepository){
		super();
	
		this.userVehicleDetailsRepository = userVehicleDetailsRepository;
		
	}
	
	@GetMapping()
	public List<UserVehicleDetails> getAll() {
		return userVehicleDetailsRepository.findAll();
	}

	@GetMapping("/{id}")
	public UserVehicleDetails getAll(@PathVariable(value = "id") Integer id) {
		return userVehicleDetailsRepository.findById(id);
	}

	@PostMapping()
	public @ResponseBody ResponseEntity<UserVehicleDetails> addUserVehicleDetail(@RequestBody UserVehicleDetails userVehicleDetails) throws Exception {
		userVehicleDetails.setId((int)sequenceIdService.getNext(userVehicleDetails));
		return new ResponseEntity<UserVehicleDetails>(userVehicleDetailsRepository.insert(userVehicleDetails), HttpStatus.CREATED);
	}
	
	@PostMapping("/bulk")
	public @ResponseBody ResponseEntity<List<UserVehicleDetails>> addUserVehicleDetails(
			@RequestBody List<UserVehicleDetails> userVehicleDetailsList) throws Exception {
		userVehicleDetailsList.forEach(userVehicleDetails -> {
			try {
				userVehicleDetails.setId((int) sequenceIdService.getNext(userVehicleDetails));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			userVehicleDetailsRepository.insert(userVehicleDetails);
		});

		// domainObject = userVehicleDetailsRepository.insert(domainObject);
		return new ResponseEntity<List<UserVehicleDetails>>(userVehicleDetailsList, HttpStatus.CREATED);
	}


	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<UserVehicleDetails> updateUserVehicleDetails(@PathVariable int id, @RequestBody UserVehicleDetails userVehicleDetails) {
		
		userVehicleDetails.setId(id);
		vehicleMasterRepository.save(userVehicleDetails.getVehicleMaster());
		userVehicleDocRepository.save(userVehicleDetails.getVehicleDoc());
		return new ResponseEntity<UserVehicleDetails>(userVehicleDetailsRepository.save(userVehicleDetails), HttpStatus.OK);

	}

	/*@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeBid(@PathVariable(value = "id") Integer id) {
		bidRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}*/

}
