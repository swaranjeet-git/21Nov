package com.pezitr.lab.repository.shipper;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.Transporter;
import com.pezitr.lab.document.shipper.Listing;

public interface ListingRepository extends MongoRepository<Listing, Integer> {

	public List<Listing> findByUserIdAndStatus(String uId, String status);
	public Listing findById(int id);
	
	public List<Listing> findByStatusOrderByToDateDesc(String status);
	public List<Listing> findByIdIn(List<Integer> ids);
	
	
	
}
