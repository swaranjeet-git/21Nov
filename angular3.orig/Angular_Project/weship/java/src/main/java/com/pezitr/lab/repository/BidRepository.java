package com.pezitr.lab.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.Bid;

public interface BidRepository extends MongoRepository<Bid, Integer> {

	public Bid findById(String id);
	public List<Bid> findByTransIdAndListId(String transId, Integer listId);

}
