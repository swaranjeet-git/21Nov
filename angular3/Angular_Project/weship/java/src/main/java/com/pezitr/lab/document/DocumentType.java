package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class DocumentType {
	
	@Id
	int id;
	@Field("docType")
	String docType;
	
	public DocumentType(){
		
	}
	public DocumentType(String docType){
		
		this.docType = docType;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getDocType() {
		return docType;
	}
	
	public void setDocType(String docType) {
		this.docType = docType;
	}
	
	
	
	

}
