package com.pezitr.lab.repository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class TransInterested {
	
	@Id
	int id;
	int user_id;
	int interested_id;
	
	public  TransInterested(){
		
	}
    
	public TransInterested(int id, int user_id, int interested_id){
		
		super();
		this.id= id;
		this.user_id= user_id;
		this.interested_id = this.interested_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getInterested_id() {
		return interested_id;
	}

	public void setInterested_id(int interested_id) {
		this.interested_id = interested_id;
	}
	
	
	
}
