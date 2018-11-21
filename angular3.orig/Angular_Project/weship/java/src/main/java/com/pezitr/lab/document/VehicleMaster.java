package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@Document
public class VehicleMaster {

	@Id 
	private Integer id;
	@Field("name")
	private String vehicleName;
	@Field("brand")
	private String brandName;
	@Field("type")
	private String type;
	@Field("size")
	private String size;
	@Field("weight")
/* kish updated as string on 16 march */
	private String capacity;
/* end kish updated as string on 16 march */
	@Field("imageUrl")
	private String imageUrl;
	@DBRef
	private VehicleMaster parent;
	/*@Field("regNo")
	private String regNo;*/
	
	/*@DBRef
	private UserVehicleDocument userVecDoc;*/
	/*@DBRef
	private User user;*/
	
	
	public VehicleMaster() {
	}


	public VehicleMaster(Integer id, String vehicleName, String brandName, String type, String size, String capacity, String imageUrl, VehicleMaster parent /*, 
			String regNo,
			UserVehicleDocument userVecDoc, User user*/) 
	{
		super();
		this.id = id;
		this.vehicleName = vehicleName;
		this.brandName = brandName;
		this.type = type;
		this.size = size;
		this.capacity = capacity;
		this.imageUrl = imageUrl;
		this.parent = parent;
		/*this.regNo = regNo;
		this.userVecDoc = userVecDoc;
		this.user = user;*/
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getVehicleName() {
		return vehicleName;
	}


	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}


	public String getBrandName() {
		return brandName;
	}


	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getSize() {
		return size;
	}


	public void setSize(String size) {
		this.size = size;
	}


/* kish updated as string on 16 march */
	public String getCapacity() {
		return capacity;
	}


	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}
/* end kish updated as string on 16 march*/

	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public VehicleMaster getParent() {
		return parent;
	}


	public void setParent(VehicleMaster parent) {
		this.parent = parent;
	}


	



	
}
