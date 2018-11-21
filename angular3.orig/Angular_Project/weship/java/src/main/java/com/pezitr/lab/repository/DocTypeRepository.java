package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.DocumentType;

public interface DocTypeRepository extends  MongoRepository<DocumentType, Integer> {
	
	public DocumentType findById(int id);
	

} 
