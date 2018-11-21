package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Invoice {
	
	@Id
	private Integer id;
	private String name;
	private Integer userId;
	private Double amount;
	
	public Invoice(Integer invoiceId, String name,Integer userId,Double amount){
		this.id=id;
		this.name=name;
		this.userId=userId;
		this.amount=amount;
	}
	public Invoice() {
		// TODO Auto-generated constructor stub
	}
	

	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	
	
	
	

}
