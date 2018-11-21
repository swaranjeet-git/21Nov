package com.pezitr.lab.document;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * @author vijay
 *
 */
@Document
public class Otp {
	
	@Id
	private String id;
	
	@Field("otp")
	private String otp;
	
	@CreatedDate
	private Instant dateTime;
	
	@LastModifiedDate
	private Instant modifiedDate;
	
	public Otp(){
		
	}

	
	public Otp(String id, String otp) {
		super();
		this.id = id;
		this.otp = otp;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public Instant getDateTime() {
		return dateTime;
	}

	public void setDateTime(Instant dateTime) {
		this.dateTime = dateTime;
	}


	public Instant getModifiedDate() {
		return modifiedDate;
	}


	public void setModifiedDate(Instant modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	
	
}
