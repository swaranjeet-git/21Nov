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

import com.pezitr.lab.document.CompanyDetails;
import com.pezitr.lab.repository.CompanyDetailsRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/companyDetails")
public class CompanyDetailsController {
	
	CompanyDetailsRepository companyDetailsRepository;
	
	@Autowired
	SequenceIdService sequenceIdService;

	public CompanyDetailsController(CompanyDetailsRepository companyDetailsRepository) {
		super();
		this.companyDetailsRepository = companyDetailsRepository;
	}

	@GetMapping()
	public List<CompanyDetails> getAll() {
		return companyDetailsRepository.findAll();
	}

	/*@GetMapping("/{id}")
	public Bid getAll(@PathVariable(value = "id") String id) {
		return bidRepository.findById(id);
	}*/

	@PostMapping()
	public @ResponseBody ResponseEntity<CompanyDetails> addCompanyDetails(@RequestBody CompanyDetails companyDetails) throws Exception {
		companyDetails.setId((int)sequenceIdService.getNext(companyDetails));
		return new ResponseEntity<CompanyDetails>(companyDetailsRepository.insert(companyDetails), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<CompanyDetails> updateCompanyDetails(@PathVariable int id, @RequestBody CompanyDetails companyDetails) {
		companyDetails.setId(id);

		return new ResponseEntity<CompanyDetails>(companyDetailsRepository.save(companyDetails), HttpStatus.OK);

	}

	/*@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeBid(@PathVariable(value = "id") Integer id) {
		bidRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}*/


}
