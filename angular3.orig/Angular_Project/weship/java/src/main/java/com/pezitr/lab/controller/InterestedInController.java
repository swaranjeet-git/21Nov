package com.pezitr.lab.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.InterestedIn;
import com.pezitr.lab.repository.InterestedInRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/genericresource")
public class InterestedInController<V> {

	InterestedInRepository<InterestedIn> interestedInRepository;

	@Autowired
	SequenceIdService sequenceIdService;

	public InterestedInController(InterestedInRepository<InterestedIn> interestedInRepository) {
		this.interestedInRepository = interestedInRepository;
	}

	@GetMapping()
	public List<InterestedIn> getAll() {
		return interestedInRepository.findAll();
	}

	@GetMapping("/{id}")
	public InterestedIn findByIntInId(@PathVariable(value = "id") int id) {
		return interestedInRepository.findById(id);
	}

	/*
	 * This method add master data interested_in table
	 */
	@PostMapping()
	public @ResponseBody ResponseEntity<InterestedIn> addInterestedIn(@RequestBody InterestedIn domainObject)
			throws Exception {
		domainObject.setId((int) sequenceIdService.getNext(domainObject));
		// domainObject = interestedInRepository.insert(domainObject);
		return new ResponseEntity<InterestedIn>(interestedInRepository.insert(domainObject), HttpStatus.CREATED);
	}

	/*
	 * This method add master data interested_in table
	 */
	@PostMapping("/bulk")
	public @ResponseBody ResponseEntity<List<InterestedIn>> addInterestedIn(
			@RequestBody List<InterestedIn> domainObjectList) throws Exception {
		domainObjectList.forEach(domainObject -> {
			try {
				domainObject.setId((int) sequenceIdService.getNext(domainObject));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			interestedInRepository.insert(domainObject);
		});

		// domainObject = interestedInRepository.insert(domainObject);
		return new ResponseEntity<List<InterestedIn>>(domainObjectList, HttpStatus.CREATED);
	}

}
