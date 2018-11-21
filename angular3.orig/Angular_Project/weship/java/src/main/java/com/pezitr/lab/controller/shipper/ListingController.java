package com.pezitr.lab.controller.shipper;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

import com.pezitr.lab.document.Location;
import com.pezitr.lab.document.shipper.Listing;
import com.pezitr.lab.repository.shipper.ListingRepository;
import com.pezitr.lab.services.GoogleDistanceService;
import com.pezitr.lab.services.OrderListingService;
import com.pezitr.lab.services.SequenceIdService;

@RestController
// @CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com",
// "http://localhost:4200"})
@CrossOrigin(origins = "*")
@RequestMapping("/listing")
public class ListingController {

	ListingRepository listingRepository;
	static ExecutorService executor = Executors.newFixedThreadPool(4);
	// @Autowired
	// BidRepository bidRepository;

	@Autowired
	SequenceIdService sequenceIdService;

	@Autowired
	OrderListingService orderListingService;

	public ListingController(ListingRepository listingRepository, SequenceIdService sequenceIdService) {
		super();
		this.listingRepository = listingRepository;
	}

	@GetMapping()
	public List<Listing> getAll() {
		return listingRepository.findAll();
	}

	@GetMapping("/cities")
	public Set<String> getCities() {
		Set<String> cities = new TreeSet<String>();
		cities.addAll(orderListingService.findDistinctFromCity());
		cities.addAll(orderListingService.findDistinctToCity());
		return cities;
	}

	@GetMapping("page/{pageNo}")
	public Page<Listing> getPageListing(@PathVariable(value = "pageNo") Integer pageNo) {
		return listingRepository.findAll(new PageRequest(pageNo, 2));
	}

	@GetMapping("user/{uid}")
	public List<Listing> getAll(@PathVariable(value = "uid") String id, @RequestParam("status") String status) {
		return listingRepository.findByUserIdAndStatus(id, status);
	}

	@GetMapping("txnList/{listingId}")
	public List<Listing> getTxnList(@PathVariable(value = "listingId") List<Integer> listIds) {
		return listingRepository.findByIdIn(listIds);
	}

	@GetMapping("status/{status}")
	public List<Listing> getByStatus(
			@PathVariable(value = "status") String status /* @RequestParam("status") String status */) {
		return listingRepository.findByStatusOrderByToDateDesc(status);
	}

	@GetMapping("/{id}")
	public Listing getListing(@PathVariable(value = "id") int id) {
		return listingRepository.findById(id);
	}

	@PostMapping()
	public @ResponseBody ResponseEntity<Listing> addListing(@RequestBody Listing listing) throws Exception {
		// String fromLat=null, fromLng=null, toLat=null, toLng=null;
		// if(listing!=null)
		// {
		// String fromLatLngStr = new JSONObject(listing).getString("fromLoc");
		// String toLatLngStr = new JSONObject(listing).getString("toLoc");
		// if(fromLatLngStr!=null)
		// {
		// JSONObject fromLatLng = new
		// JSONObject(fromLatLngStr).getJSONObject("latlng");
		// fromLat = Double.toString(fromLatLng.getDouble("lat"));
		// fromLng = Double.toString(fromLatLng.getDouble("lng"));
		//
		// }
		// if(toLatLngStr!=null)
		// {
		// JSONObject toLatLng = new JSONObject(toLatLngStr).getJSONObject("latlng");
		// toLat = Double.toString(toLatLng.getDouble("lat"));
		// toLng = Double.toString(toLatLng.getDouble("lng"));
		// }
		//
		// }

		listing.setId((int) sequenceIdService.getNext(listing));
		listing = listingRepository.insert(listing);
		saveDistanceAndCoordinate(listing.getId());
		return new ResponseEntity<Listing>(listing, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<Listing> updateListing(@PathVariable Integer id,
			@RequestBody Listing newListing) {
		Listing oldListing = listingRepository.findById(id);
		/*
		 * oldListing.setStatus(newListing.getStatus() != null ? newListing.getStatus():
		 * oldListing.getStatus());
		 */
		listingMapper(oldListing, newListing);
		return new ResponseEntity<Listing>(listingRepository.save(oldListing), HttpStatus.OK);
	}

	private void listingMapper(Listing oldListing, Listing newListing) {
		oldListing.setStatus(newListing.getStatus() != null ? newListing.getStatus() : oldListing.getStatus());
		oldListing.setSummary(newListing.getSummary() != null ? newListing.getSummary() : oldListing.getSummary());
		oldListing.setFromLoc(newListing.getFromLoc() != null ? newListing.getFromLoc() : oldListing.getFromLoc());
		oldListing.setToLoc(newListing.getToLoc() != null ? newListing.getToLoc() : oldListing.getToLoc());
		oldListing.setFromDate(newListing.getFromDate() != null ? newListing.getFromDate() : oldListing.getFromDate());
		oldListing.setToDate(newListing.getToDate() != null ? newListing.getToDate() : oldListing.getToDate());
		oldListing.setBrandId(newListing.getBrandId() != null ? newListing.getBrandId() : oldListing.getBrandId());
		oldListing.setVehicleId(
				newListing.getVehicleId() != null ? newListing.getVehicleId() : oldListing.getVehicleId());
		oldListing.setBidCount(newListing.getBidCount() != null ? newListing.getBidCount() : oldListing.getBidCount());
	}

	/*
	 * @PutMapping("/{id}") public @ResponseBody ResponseEntity<Listing>
	 * updateListing(@PathVariable Integer id, @RequestBody Listing listing) {
	 * listing.setId(id); return new
	 * ResponseEntity<Listing>(listingRepository.save(listing), HttpStatus.OK); }
	 */

	@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeListing(@PathVariable(value = "id") Integer id) {
		listingRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	private void saveDistanceAndCoordinate(Integer listingId) {
		Future<Listing> future = executor.submit(new saveTask(listingId));

	}

	/**
	 * @author vijay
	 *
	 */
	class saveTask implements Callable<Listing> {
		Integer listingId;

		public saveTask(Integer listingId) {
			super();
			this.listingId = listingId;
		}

		@Override
		public Listing call() throws Exception {
			Listing listing = listingRepository.findById(listingId);
			Map<String, String> res = GoogleDistanceService.getDistance(listing.getFromLatLng(), listing.getToLatLng());
			Location fromLocation = new Location(listing.getFromLocGoogle());
			Location toLocation = new Location(listing.getToLocGoogle());
			listing.setFromLoc(fromLocation);
			listing.setToLoc(toLocation);
			listing.setFromCity(fromLocation.getCity());
			listing.setToCity(toLocation.getCity());

			listing.setDuration(res.get("duration"));
			listing.setDistance(res.get("distance"));
			return listingRepository.save(listing);
		}
	}

}
