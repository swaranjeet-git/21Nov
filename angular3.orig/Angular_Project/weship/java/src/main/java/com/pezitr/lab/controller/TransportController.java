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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.CompanyDetails;
//import com.pezitr.lab.document.Order;
import com.pezitr.lab.document.Transporter;
import com.pezitr.lab.document.User;
import com.pezitr.lab.document.UserVehicleDetails;
import com.pezitr.lab.document.UserVehicleDocument;
import com.pezitr.lab.repository.TransportRepository;
import com.pezitr.lab.repository.UserRepository;
import com.pezitr.lab.repository.VehicleMasterRepository;
import com.pezitr.lab.services.SequenceIdService;
import com.pezitr.lab.services.TransporterService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/transporter")
public class TransportController {
	
	TransportRepository transportRepository;
	@Autowired
	VehicleMasterRepository vehicleMasterRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	SequenceIdService sequenceIdService;
	@Autowired
	TransporterService transporterService;
	
	User user;
	CompanyDetails companyDetails;
	UserVehicleDetails userVehicleDetails;
	UserVehicleDocument userVehicleDocument;
	
	public TransportController(TransportRepository transportRepository){
		this.transportRepository = transportRepository;
	}
	
	@GetMapping()
	public List<Transporter> getAll() {
		return transportRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Transporter findById(@PathVariable(value = "id") Integer id) {
		return transportRepository.findById(id);
	}
	
	@GetMapping("/user/{id}")
	public Transporter findByUserId(@PathVariable(value = "id") String id) {
		return transportRepository.findByUserId(id);
	}
	
	@GetMapping("/user")
	public Transporter findByUserId(@RequestParam(value = "email") String email, @RequestParam(value = "mobile") String mobile) {
		User user = userRepository.findByEmailAndMobile(email, mobile);
		return transportRepository.findByUserId(user.getId());
	}
	
	@GetMapping("/vehicle/{id}")
	public List<Transporter> findByVehicleId(@PathVariable(value = "id") Integer id) {

		return transporterService.getTransporters(id);
	}
	
	@PostMapping()
	public @ResponseBody ResponseEntity<Transporter> addTransporter(@RequestBody Transporter transporter) throws Exception {
		
		user = transporter.getUser();
		if(user == null || user.equals("")){
			throw(new NullPointerException());
		}
			
		companyDetails = transporter.getCompanyDetails();
		if(companyDetails == null || companyDetails.equals("")){
			throw(new NullPointerException());
		}
		
		userVehicleDetails = transporter.getVehicleDetail();
		if(userVehicleDetails == null || userVehicleDetails.equals("")){
			throw(new NullPointerException());
		}
		
		userVehicleDocument = transporter.getVehicleDetail().getVehicleDoc();
		if(userVehicleDocument == null || userVehicleDocument.equals("")){
			throw(new NullPointerException());
		}
		
//		@ TODO : validate User and vehicle.
		transporter.setUser(userRepository.findById(user.getId()));
		transporter.setCompanyDetails(transporterService.addCompanyDetails(transporter.getCompanyDetails()));
		transporter.getVehicleDetail().setVehicleDoc(transporterService.addUserVehicleDocument(userVehicleDocument));
		
		transporter.setVehicleDetail(transporterService.addUserVehicleDetails(userVehicleDetails));
		
		
		transporter.setId((int)sequenceIdService.getNext(transporter));
		System.out.println("-GetId: -->"+ transporter.getId());
		return new ResponseEntity<Transporter>(transportRepository.insert(transporter), HttpStatus.CREATED);
		//return null;
	}
	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<Transporter> updateTransporter(@PathVariable Integer id, @RequestBody Transporter transporter) {
		transporter.setId(id);
		/*order.getBid().stream().map(val -> {
			val.setDate(bidRepository.findById(val.getId()).getDate());
			return val;
		}).forEach(arg0 -> {});;*/
		return new ResponseEntity<Transporter>(transportRepository.save(transporter), HttpStatus.OK);

	}
	
	
}
