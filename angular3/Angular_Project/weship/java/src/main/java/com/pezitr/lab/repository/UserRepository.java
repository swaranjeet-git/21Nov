package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.User;

public interface UserRepository extends MongoRepository<User, String> {

	public User findById(String itemId);
	public User findByToken(String tokenId);
	public User findByEmailAndMobile(String email, String mob);
	public User findByEmail(String email);
	public User findByMobile(String mob);

}
