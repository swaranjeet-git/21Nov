package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.InterestedIn;



public interface InterestedInRepository<v> extends  MongoRepository<InterestedIn, Integer> {
	
	public InterestedIn findById(int id);
	

} 
