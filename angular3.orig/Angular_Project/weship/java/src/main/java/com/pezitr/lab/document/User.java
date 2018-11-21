package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Document
public class User {

	@Id 
	private String id;
	@Field("token")
	private String token;
	@Field("fName")
	private String fName;
	@Field("lName")
	private String lName;
	@Field("email")
	private String email;
	@Field("mobile")
	private String mobile;
	@Field("mcountry")
	private String mcountry;
	@Field("gender")
	private String gender;
	@Field("picture")
	private String picture;
	@JsonIgnore
	@Field("pwd")
	private String pwd;
	
	
	@Field("loginType")
	private String loginType;
	/*@Field("companyName")
	private String companyName;*/
	/*@Field("interestedIn")
	private List<Integer> interestedIn;*/
	
	public User() {
	}

	public User(String fName, String lName, String email, String mobile/*, String companyName, List<Integer> interestedIn*/) {
		super();
		this.fName = fName;
		this.lName = lName;
		this.email = email;
		this.mobile = mobile;
		/*this.companyName = companyName;*/
		/*this.interestedIn = interestedIn;*/
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLoginType() {
		return loginType;
	}

	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getMcountry() {
		return mcountry;
	}

	public void setMcountry(String mcountry) {
		this.mcountry = mcountry;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	

	/*public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}*/

	/*public List<Integer> getInterestedIn() {
		return interestedIn;
	}

	public void setInterestedIn(List<Integer> interestedIn) {
		this.interestedIn = interestedIn;
	}*/

	
	
	
}
