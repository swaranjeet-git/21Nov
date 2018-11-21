package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class UserVehicleDocument {
	
	@Id
	public int id;
	@Field("docNo")
	public String docNo;
	@Field("desc")
	public String desc;
	
	@DBRef
	public DocumentType documentType;
		
		
	public UserVehicleDocument(){
		
	}
	
	public UserVehicleDocument(String docNo,DocumentType documentType/*, User user,VehicleDetail vehicleDetail*/){
		
		this.docNo=docNo;
		this.documentType = documentType;
		/*this.user = user;*/
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDocNo() {
		return docNo;
	}

	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}

	public DocumentType getDocumentType() {
		return documentType;
	}

	public void setDocumentType(DocumentType documentType) {
		this.documentType = documentType;
	}


}
