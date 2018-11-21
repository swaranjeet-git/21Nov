package com.pezitr.lab.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.TransporterTxn;

public  interface TransporterTxnRepository extends MongoRepository<TransporterTxn, Integer>  {
	
	public List<TransporterTxn> findByUserIdAndStatus(String uId, String status);
	public List<TransporterTxn> findByUserId(String id);
	public List<TransporterTxn> findByListingIdAndStatus(Integer id, String status);
	public TransporterTxn findById(Integer id);
	public TransporterTxn findByListingIdAndUserId(Integer listingId, String userId);
	
	//public List<Listing> findByStatusOrderByToDateDesc(String status);

}
