/* This POJO mapped with interested_in table 
 * Author Kishore Darne
 * Date: 12/12/2017
 */

package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class InterestedIn {
	
	@Id
	private int id;
	private String name;
	private String desc;
	
	
	public InterestedIn(){
		
	}
	


	
	public InterestedIn(String name, String desc) {
		super();
		this.name = name;
		this.desc = desc;
	}




	public String getDesc() {
		return desc;
	}




	public void setDesc(String desc) {
		this.desc = desc;
	}




	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	

	
}
