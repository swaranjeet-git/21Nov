package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.Address;

public interface AddressRepository extends MongoRepository<Address, Integer>{

}
