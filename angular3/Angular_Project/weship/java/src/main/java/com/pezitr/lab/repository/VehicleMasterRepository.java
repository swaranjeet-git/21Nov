package com.pezitr.lab.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.VehicleMaster;

public interface VehicleMasterRepository extends MongoRepository<VehicleMaster, Integer> {

	
	public VehicleMaster findById(Integer itemId);
	
	public List<VehicleMaster> findByParentId(Integer id);
	
	public List<VehicleMaster>findByParentIsNull();

}
