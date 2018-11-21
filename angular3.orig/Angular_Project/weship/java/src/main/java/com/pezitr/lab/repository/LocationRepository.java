package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.Address;
import com.pezitr.lab.document.Location;

public interface LocationRepository extends MongoRepository<Location, Integer>{

}
