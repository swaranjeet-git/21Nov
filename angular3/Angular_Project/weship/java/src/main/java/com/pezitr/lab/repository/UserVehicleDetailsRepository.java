package com.pezitr.lab.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.UserVehicleDetails;

public interface UserVehicleDetailsRepository extends MongoRepository<UserVehicleDetails, Integer>{
	
	public UserVehicleDetails findById(int id);
	public List<UserVehicleDetails> findByVehicleMasterId(int id);

}
