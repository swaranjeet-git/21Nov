package com.pezitr.lab.controller.transporter;

import java.time.Instant;
import java.util.ArrayList;
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

import com.pezitr.lab.document.Bid;
import com.pezitr.lab.document.TransporterTxn;
import com.pezitr.lab.document.shipper.ListItem;
import com.pezitr.lab.document.shipper.Listing;
import com.pezitr.lab.repository.TransporterTxnRepository;
import com.pezitr.lab.repository.shipper.ListingRepository;
import com.pezitr.lab.services.SequenceIdService;
import com.pezitr.lab.services.TransporterService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200","https://weship123.herokuapp.com"})
@RequestMapping("/transportertxn")
public class TransporterTxnController {
	
	TransporterTxnRepository transporterTxnRepository;
	
	@Autowired
	ListingRepository listingRepository;
	
	@Autowired
	SequenceIdService sequenceIdService;
	
	@Autowired
	TransporterService transporterService;
	
	public TransporterTxnController(TransporterTxnRepository transporterTxnRepository){
		this.transporterTxnRepository = transporterTxnRepository;
		
	}
	@GetMapping("")
	public List <TransporterTxn>getAll() {
		return transporterTxnRepository.findAll();
	}
	
	@GetMapping("/{uid}")
	public List<TransporterTxn> getUserTxn(@PathVariable(value = "uid") String id) {
		
		return transporterService.getTranTxnByUser(id);
	}
	@GetMapping("bid/{uid}")
	public List<TransporterTxn> getUserTxnByStatus(@PathVariable(value = "uid") String id, @RequestParam("status") String status) {
		
		return transporterService.getTranTxnByStatusListing(id, status);
	}
	
	@GetMapping("/orderdetail/{listingId}")
	public List<ListItem> getUserOrderDetail(@PathVariable(value = "listingId") Integer id) {
		
		return transporterService.getOrderDetail(id);
	}
	
	@GetMapping("/bidlist/{listingId}")
	public List<TransporterTxn> getbidDetail(@PathVariable(value = "listingId") Integer id,@RequestParam("status") String status) {
		
		return transporterService.getTransporterTxn(id, status);
	}
	
	@GetMapping("/userbid/{listingId}")
	public TransporterTxn getUserBidDetail(@PathVariable(value = "listingId") Integer listingId,@RequestParam("user") String userId) {
		
		return transporterService.getUserTransporterTxn(listingId, userId);
	}
	
	@PostMapping()
	public @ResponseBody ResponseEntity<TransporterTxn> addTransporterTxn(@RequestBody TransporterTxn transporterTxn) throws Exception {
		
		transporterTxn.setId((int)sequenceIdService.getNext(transporterTxn));
		transporterTxn.setUserId(transporterTxn.getBid().getTransId());
		transporterTxn.setShipperId(transporterTxn.getBid().getShipperId());
		transporterTxn.setListingId(transporterTxn.getBid().getListId());
		transporterTxn.setCreateDate(Instant.now());
		transporterTxn.setModifyDate(Instant.now());
			
		return new ResponseEntity<TransporterTxn>(transporterTxnRepository.insert(transporterTxn), HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<TransporterTxn> updateTransporterTxn(@PathVariable Integer id, @RequestBody TransporterTxn newTransporterTxn) {
		TransporterTxn oldTransporterTxn = transporterTxnRepository.findById(id);
		transporterTxnMapper(oldTransporterTxn,newTransporterTxn);
		return new ResponseEntity<TransporterTxn>(transporterTxnRepository.save(oldTransporterTxn), HttpStatus.OK);
	}
	private void transporterTxnMapper(TransporterTxn oldTransporterTxn, TransporterTxn newTransporterTxn) {
		oldTransporterTxn.setStatus(newTransporterTxn.getStatus() != null ? newTransporterTxn.getStatus(): oldTransporterTxn.getStatus());
		
	}
}


