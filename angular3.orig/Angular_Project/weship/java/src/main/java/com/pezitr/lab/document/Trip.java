package com.pezitr.lab.document;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Trip {
	
	@Id
	private Integer tripId;
	private String pickup;
	private String drop;
	private Date pdate;
	private Date ddate;
	private String preftime;
	private Integer invoiceId;
	
	public Trip(Integer tripId,String pickup,String drop,Date pdate,Date date,String preftime,Integer invoiceId){
		
		
		this.tripId=tripId;
		this.pickup= pickup;
		this.drop=drop;
		this.pdate=pdate;
		this.ddate=ddate;
		this.preftime=preftime;
		this.invoiceId=invoiceId;
		
	}

	public Integer getTripId() {
		return tripId;
	}

	public void setTripId(Integer tripId) {
		this.tripId = tripId;
	}

	public String getPickup() {
		return pickup;
	}

	public void setPickup(String pickup) {
		this.pickup = pickup;
	}

	public String getDrop() {
		return drop;
	}

	public void setDrop(String drop) {
		this.drop = drop;
	}

	public Date getPdate() {
		return pdate;
	}

	public void setPdate(Date pdate) {
		this.pdate = pdate;
	}

	public Date getDdate() {
		return ddate;
	}

	public void setDdate(Date ddate) {
		this.ddate = ddate;
	}

	public String getPreftime() {
		return preftime;
	}

	public void setPreftime(String preftime) {
		this.preftime = preftime;
	}

	public Integer getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Integer invoiceId) {
		this.invoiceId = invoiceId;
	}
	

}
