package com.pezitr.lab.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.Address;
import com.pezitr.lab.repository.AddressRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/address")
public class AddressController {
	
	AddressRepository addressRepository;
	
	
	@Autowired
	SequenceIdService sequenceIdService;
	
	
	public AddressController(AddressRepository addressRepository){
		this.addressRepository = addressRepository;
	}
	
	@GetMapping()
	public List<Address> getAll() {
		return addressRepository.findAll();
	}
	
	/*@GetMapping("/{id}")
	public Transporter findById(@PathVariable(value = "id") Integer id) {
		return transportRepository.findById(id);
	}*/
	
	@PostMapping()
	public @ResponseBody ResponseEntity<Address> addAddress(@RequestBody Address address) throws Exception {
		address.setId((int)sequenceIdService.getNext(address));
		return new ResponseEntity<Address>(addressRepository.insert(address), HttpStatus.CREATED);
	}
	


}
