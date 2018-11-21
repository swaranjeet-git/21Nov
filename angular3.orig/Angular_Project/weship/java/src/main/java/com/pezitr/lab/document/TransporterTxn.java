package com.pezitr.lab.document;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.pezitr.lab.document.shipper.Listing;

@Document
public class TransporterTxn {
	
	@Id
	private Integer id;
	private Integer listingId;
	//private Listing listing;
	private String userId;
	private String shipperId;
	@DBRef
	private Bid bid;
	private String status;
	@CreatedDate
	private Instant createDate;
	@LastModifiedDate
	private Instant modifyDate;
	
	
	public TransporterTxn(){
		
	}
	public TransporterTxn(Integer listingId,String userId, String shipperId, Bid  bid, String status,Instant createDate,Instant modifyDate){
		
		this.listingId = listingId;
		this.userId = userId;
		this.shipperId = shipperId;
		this.bid = bid;
		this.status = status;
		this.createDate = createDate;
		this.modifyDate = modifyDate;
		
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	
	public Integer getListingId() {
		return listingId;
	}
	public void setListingId(Integer listingId) {
		this.listingId = listingId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getShipperId() {
		return shipperId;
	}
	public void setShipperId(String shipperId) {
		this.shipperId = shipperId;
	}
	public Bid getBid() {
		return bid;
	}
	public void setBid(Bid bid) {
		this.bid = bid;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Instant getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Instant createDate) {
		this.createDate = createDate;
	}
	public Instant getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Instant modifyDate) {
		this.modifyDate = modifyDate;
	}
	
	
	
	

}
