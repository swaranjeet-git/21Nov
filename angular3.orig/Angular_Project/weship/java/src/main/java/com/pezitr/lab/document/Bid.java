package com.pezitr.lab.document;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import com.pezitr.lab.document.shipper.Listing;

public class Bid {

	@Id
	private Integer id;
	private double amount;
	@CreatedDate
	private Instant date;
	private Integer listId;
	private String shipperId;
	private String transId;
	private String transFName;
	private String transLName;
	private String transMobile;
	private String transEmail;
	
	
	public Bid() {
	}
	
	public Bid(String shipperId, String transId,String transFName,String transLName,String transMobile,String transEmail, double amount, Integer listId, Instant date) {
		super();
		this.shipperId = shipperId;
		this.transId = transId;
		this.transFName = transFName;
		this.transLName = transLName;
		this.transMobile = transMobile;
		this.transEmail = transEmail;
		this.amount = amount;
		this.listId = listId;
		this.date = date;
	}

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Instant getDate() {
		return date;
	}
	public String getDateString() {
		return date==null? "" : date.toString();
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public Integer getListId() {
		return listId;
	}

	public void setListId(Integer listId) {
		this.listId = listId;
	}

	public String getShipperId() {
		return shipperId;
	}

	public void setShipperId(String shipperId) {
		this.shipperId = shipperId;
	}

	public String getTransId() {
		return transId;
	}

	public void setTransId(String transId) {
		this.transId = transId;
	}

	public String getTransFName() {
		return transFName;
	}

	public void setTransFName(String transFName) {
		this.transFName = transFName;
	}

	public String getTransLName() {
		return transLName;
	}

	public void setTransLName(String transLName) {
		this.transLName = transLName;
	}

	public String getTransMobile() {
		return transMobile;
	}

	public void setTransMobile(String transMobile) {
		this.transMobile = transMobile;
	}

	public String getTransEmail() {
		return transEmail;
	}

	public void setTransEmail(String transEmail) {
		this.transEmail = transEmail;
	}

	

	

	

}
