package com.example;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
	private String id;
	@JsonProperty("First Name")
	private String firstName;
	@JsonProperty("Last Name")
	private String lastName;
	@JsonProperty("Phone Number")
	private String phoneNumber;
	@JsonProperty("Birthday date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private String birthdayDate;
	
	public User(){
		id = "N/A";
		firstName = "N/A";
		lastName = "N/A";
		phoneNumber = "N/A";
		birthdayDate = "N/A";
	}

	public User(String id, String firstName, String lastName, String phoneNumber, String birthdayDate){
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.birthdayDate = birthdayDate;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBirthdayDate() {
		return birthdayDate;
	}

	public void setBirthdayDate(String birthdayDate) {
		this.birthdayDate = birthdayDate;
	}
	
	
}
