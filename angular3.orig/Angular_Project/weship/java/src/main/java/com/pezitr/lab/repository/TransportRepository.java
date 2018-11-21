package com.pezitr.lab.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.Transporter;

public interface TransportRepository extends MongoRepository<Transporter, Integer> {
	
	public Transporter findById(Integer id);
	
	public Transporter findByUserId(String id);
	
	public List<Transporter> findByVehicleDetailIn(List<Integer> ids);

	//public List<Transporter> findByUserVehicleDetails(Integer vehicleMasterId);

}
