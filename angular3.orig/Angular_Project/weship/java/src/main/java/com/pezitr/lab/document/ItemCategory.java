package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class ItemCategory {

	@Id 
	private Integer id;
	private String name;
	private String desc;
	private String type;
	@DBRef
	private ItemCategory parent;
	
	public ItemCategory() {
	}



	public ItemCategory(String name, String desc, String type, ItemCategory parent) {
		super();
		this.name = name;
		this.desc = desc;
		this.parent = parent;
		this.type = type;
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



	public ItemCategory getParent() {
		return parent;
	}

	public void setParent(ItemCategory parent) {
		this.parent = parent;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}



	public String getType() {
		return type;
	}



	public void setType(String type) {
		this.type = type;
	}
	
}
