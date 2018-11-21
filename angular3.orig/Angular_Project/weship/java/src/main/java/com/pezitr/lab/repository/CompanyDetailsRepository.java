package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.CompanyDetails;

public interface CompanyDetailsRepository extends MongoRepository<CompanyDetails, Integer> {

}
