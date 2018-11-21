package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.UserVehicleDocument;

public interface UserVehicleDocRepository extends MongoRepository<UserVehicleDocument, Integer> {
	
	public UserVehicleDocument findById(int id);

}
