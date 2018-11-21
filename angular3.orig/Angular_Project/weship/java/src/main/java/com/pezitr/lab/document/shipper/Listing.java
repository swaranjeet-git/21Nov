package com.pezitr.lab.document.shipper;

import java.time.LocalDate;

/*import java.util.List;*/

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
/*import org.springframework.data.mongodb.core.mapping.DBRef;*/
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.pezitr.lab.document.Location;

@Document
public class Listing {
	
	@Id 
	private Integer id;
	private String userId;
	@Field("name")
	private String name;
	@Field("status")
	private String status;
	private String count;
	private String summary;
	private String duration;
	private String distance;
//	@DBRef
//	private Location fromLoc;
//	@DBRef
//	private Location toLoc;
	
//	Location Object
	private Location fromLoc;
	private Location toLoc;
//	LatLng
	private String fromLatLng;
	private String toLatLng;
//	City Name
	private String fromCity;
	private String toCity;
//	Location from Google
	private String toLocGoogle;
	private String fromLocGoogle;

	
	private LocalDate fromDate;
	private LocalDate toDate;
	private Integer brandId;
	private Integer vehicleId;
	private boolean shared;
	private boolean covered;
	private Integer userAmount;
	private Integer bidCount;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public LocalDate getFromDate() {
		return fromDate;
	}

	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}

	public LocalDate getToDate() {
		return toDate;
	}

	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}

	public Integer getUserAmount() {
		return userAmount;
	}

	public void setUserAmount(Integer userAmount) {
		this.userAmount = userAmount;
	}
	
	public Integer getBrandId() {
		return brandId;
	}

	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}

	public Integer getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}



	public boolean isShared() {
		return shared;
	}

	public void setShared(boolean shared) {
		this.shared = shared;
	}

	public boolean isCovered() {
		return covered;
	}

	public void setCovered(boolean covered) {
		this.covered = covered;
	}

	public Integer getBidCount() {
		return bidCount;
	}

	public void setBidCount(Integer bidCount) {
		this.bidCount = bidCount;
	}
	
	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

//	public Location getFromLoc() {
//		return fromLoc;
//	}
//
//	public void setFromLoc(Location fromLoc) {
//		this.fromLoc = fromLoc;
//	}
//
//	public Location getToLoc() {
//		return toLoc;
//	}
//
//	public void setToLoc(Location toLoc) {
//		this.toLoc = toLoc;
//	}

	public Location getFromLoc() {
		return fromLoc;
	}

	public void setFromLoc(Location fromLoc) {
		this.fromLoc = fromLoc;
	}

	public Location getToLoc() {
		return toLoc;
	}

	public void setToLoc(Location toLoc) {
		this.toLoc = toLoc;
	}

	public String getFromLatLng() {
		return fromLatLng;
	}

	public void setFromLatLng(String fromLatLng) {
		this.fromLatLng = fromLatLng;
	}

	public String getToLatLng() {
		return toLatLng;
	}

	public void setToLatLng(String toLatLng) {
		this.toLatLng = toLatLng;
	}

	public String getFromCity() {
		return fromCity;
	}

	public void setFromCity(String fromCity) {
		this.fromCity = fromCity;
	}

	public String getToCity() {
		return toCity;
	}

	public void setToCity(String toCity) {
		this.toCity = toCity;
	}

	public String getToLocGoogle() {
		return toLocGoogle;
	}

	public void setToLocGoogle(String toLocGoogle) {
		this.toLocGoogle = toLocGoogle;
	}

	public String getFromLocGoogle() {
		return fromLocGoogle;
	}

	public void setFromLocGoogle(String fromLocGoogle) {
		this.fromLocGoogle = fromLocGoogle;
	}

	
	
	
	

}
