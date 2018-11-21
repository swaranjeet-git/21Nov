package com.pezitr.lab.document;

/*import java.util.List;*/

import org.springframework.data.annotation.Id;
/*import org.springframework.data.mongodb.core.mapping.DBRef;*/
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Order {
	
	@Id 
	
	private Integer id;
	@Field("name")
	private String name;
	@Field("userAmount")
	private Integer userAmount;
	
	/*@DBRef
	private List<Bid> bid;*/
	
	public Order() {}
	
	

	public Order(String name, Integer userAmount/*, List<Bid> bid*/) {
		super();
		this.name = name;
		this.userAmount = userAmount;
		/*this.bid = bid;*/
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

	public Integer getUserAmount() {
		return userAmount;
	}

	public void setUserAmount(Integer userAmount) {
		this.userAmount = userAmount;
	}



	/*public List<Bid> getBid() {
		return bid;
	}
	public void setBid(List<Bid> bid) {
		this.bid = bid;
	}*/



}
