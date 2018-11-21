package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.Otp;

public interface OtpRepository extends MongoRepository<Otp, String>{

	public Otp findById(String id);
}
