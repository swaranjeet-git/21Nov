package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class CompanyDetails {
	
	@Id
	private int id;
	
	@Field("companyName")
	private String companyName;
	
	@Field("address")
	private String address;
	
	@Field("city")
	private String city;
	
	@Field("state")
	private String state;
	
	@Field("country")
	private String country;
	
	@Field("pincode")
	private String pincode;
	
	public CompanyDetails(){
		
	}
	
	public CompanyDetails(String companyName,String address,String city,String state,String country,String pincode){
		super();
		
		
		this.companyName = companyName;
		this.address= address;
		this.city = city;
		this.state = state;
		this.country = country;
		this.pincode = pincode;
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	
	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	
	

}
