package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class UserVehicleDetails {
	
	@Id
	private Integer id;
	
	@Field("regNo")
	private String vehicleRegNo;
	
	@Field("uploadImg")
	private String uploadImg;
	
	@DBRef
	private VehicleMaster vehicleMaster;
	
	@DBRef
	private UserVehicleDocument vehicleDoc;
	
	public UserVehicleDetails(){
		
	}
	
	public UserVehicleDetails(String vehicleRegNo,String uploadImg,VehicleMaster vehicleMaster,UserVehicleDocument vehicleDoc){
		
		super();
		
		this.vehicleRegNo = vehicleRegNo;
		this.uploadImg= uploadImg;
		this.vehicleMaster = vehicleMaster;
		this.vehicleDoc = vehicleDoc;
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	
	
	public String getVehicleRegNo() {
		return vehicleRegNo;
	}

	public void setVehicleRegNo(String vehicleRegNo) {
		this.vehicleRegNo = vehicleRegNo;
	}
	
	public String getUploadImg() {
		return uploadImg;
	}

	public void setUploadImg(String uploadImg) {
		this.uploadImg = uploadImg;
	}

	public VehicleMaster getVehicleMaster() {
		return vehicleMaster;
	}

	public void setVehicleMaster(VehicleMaster vehicleMaster) {
		this.vehicleMaster = vehicleMaster;
	}

	public UserVehicleDocument getVehicleDoc() {
		return vehicleDoc;
	}

	public void setVehicleDoc(UserVehicleDocument vehicleDoc) {
		this.vehicleDoc = vehicleDoc;
	}
	
	

}
