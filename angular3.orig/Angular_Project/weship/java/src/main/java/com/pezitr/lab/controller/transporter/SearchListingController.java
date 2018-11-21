package com.pezitr.lab.controller.transporter;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.shipper.Listing;
import com.pezitr.lab.repository.shipper.ListingRepository;
import com.pezitr.lab.services.OrderListingService;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = { "https://pezitr-163717.firebaseapp.com", "http://localhost:4200" })
@RequestMapping("/listingOrder")
public class SearchListingController {

	ListingRepository listingRepository;
	// @Autowired
	// BidRepository bidRepository;

	@Autowired
	SequenceIdService sequenceIdService;

	@Autowired
	OrderListingService orderListingService;

	public SearchListingController(ListingRepository listingRepository, SequenceIdService sequenceIdService) {
		super();
		this.listingRepository = listingRepository;
	}

	// @GetMapping()
	// public List<Listing> getAll() {
	// return listingRepository.findByStatusOrderByToDateDesc("published");
	// }
	@GetMapping()
	public List<Listing> getAll(@RequestParam Map<String, String> queryParameters, Pageable pageable) {
		List<Listing> list  = orderListingService.getAll(queryParameters, pageable);
		list.addAll(list);
		list.addAll(list);
		list.addAll(list);
		list.addAll(list);
		list.addAll(list);
		return list;
		// return listingRepository.findAll();
	}
	
	@GetMapping("/count")
	public long getCount(@RequestParam Map<String, String> queryParameters) {
		return orderListingService.getCount(queryParameters)*10;
		
	}


	@GetMapping("/{uid}")
	public List<Listing> getAll(@PathVariable(value = "uid") String id, @RequestParam("status") String status) {
		return listingRepository.findByUserIdAndStatus(id, status);
	}

	@PostMapping()
	public @ResponseBody ResponseEntity<Listing> addListing(@RequestBody Listing listing) throws Exception {
		listing.setId((int) sequenceIdService.getNext(listing));
		return new ResponseEntity<Listing>(listingRepository.insert(listing), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<Listing> updateListing(@PathVariable Integer id, @RequestBody Listing listing) {
		listing.setId(id);
		/*
		 * listing.getBid().stream().map(val -> {
		 * val.setDate(bidRepository.findById(val.getId()).getDate()); return val;
		 * }).forEach(arg0 -> {});
		 */
		return new ResponseEntity<Listing>(listingRepository.save(listing), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeListing(@PathVariable(value = "id") Integer id) {
		listingRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
