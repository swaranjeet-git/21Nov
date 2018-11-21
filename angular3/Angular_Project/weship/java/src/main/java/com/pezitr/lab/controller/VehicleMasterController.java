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

import com.pezitr.lab.document.VehicleMaster;
import com.pezitr.lab.repository.VehicleMasterRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/vehicleMaster")
public class VehicleMasterController {

	VehicleMasterRepository vehicleMasterRepository;

	@Autowired
	SequenceIdService sequenceIdService;
	
	public VehicleMasterController(VehicleMasterRepository vehicleMasterRepository) {
		super();
		this.vehicleMasterRepository = vehicleMasterRepository;
	}

	@GetMapping()
	public List<VehicleMaster> getAll() {
		return vehicleMasterRepository.findAll();
	}

	@GetMapping("/{id}")
	public VehicleMaster getAll(@PathVariable(value = "id") Integer id) {
		return vehicleMasterRepository.findById(id);
	}
	@GetMapping("/vehicle/{id}")
	public VehicleMaster getVehicle(@PathVariable(value = "id") Integer id) {
		return vehicleMasterRepository.findById(id);
	}
	@GetMapping("/parent/{id}")
	public List<VehicleMaster> getChildAll(@PathVariable(value = "id") Integer id) {
		return vehicleMasterRepository.findByParentId(id);
	}
	
	@GetMapping("/parent")
	public List<VehicleMaster> getParentAll(/*@PathVariable(value = "")*/) {
		return vehicleMasterRepository.findByParentIsNull();
	}
	
	
	@PostMapping()
	public @ResponseBody ResponseEntity<VehicleMaster> addVehicleDetail(@RequestBody VehicleMaster vehicleMaster) throws Exception {
		vehicleMaster.setId((int)sequenceIdService.getNext(vehicleMaster));
		return new ResponseEntity<VehicleMaster>(vehicleMasterRepository.insert(vehicleMaster), HttpStatus.CREATED);
//		return null;
	}
	@PostMapping("/bulk")
	public @ResponseBody ResponseEntity<List<VehicleMaster>> addVehicleMaster(
			@RequestBody List<VehicleMaster> vehicleMasterList) throws Exception {
		vehicleMasterList.forEach(vehicleMaster -> {
			try {
				vehicleMaster.setId((int) sequenceIdService.getNext(vehicleMaster));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			vehicleMasterRepository.insert(vehicleMaster);
		});

		// domainObject = vehicleMasterRepository.insert(domainObject);
		return new ResponseEntity<List<VehicleMaster>>(vehicleMasterList, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<VehicleMaster> updateVehicleDetail(@PathVariable Integer id, @RequestBody VehicleMaster vehicleMaster) {
		vehicleMaster.setId(id);

		return new ResponseEntity<VehicleMaster>(vehicleMasterRepository.save(vehicleMaster), HttpStatus.OK);

	}

	
	@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeVehicleDetail(@PathVariable(value = "id") Integer id) {
//		vehicleMasterRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
