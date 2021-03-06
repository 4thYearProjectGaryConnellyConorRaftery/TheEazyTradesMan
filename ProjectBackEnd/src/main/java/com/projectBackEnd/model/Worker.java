package com.projectBackEnd.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

import org.hibernate.annotations.GenericGenerator;

/**
 * The object representing a Worker. Worker objects will get persisted to the mongo database.
 * @author Gary
 *
 */

@Entity
@NamedQuery(name = "Worker.findAll", query = "SELECT w FROM Worker w")
public class Worker {
	
	/**
	 * Getter and setter methods for each field, including unique ID generators.
	 */
	
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	private String firstName;
	private String secondName;
	private String address;
	private int age;
	private String trade;
	private String rating;
	private String phoneNumber;
	private String email;
	private String website;
	private String firebaseUid;
	private String jobsRequested;
	
	private String jobsAccepted;
	
	
	public String getJobsAccepted() {
		return jobsAccepted;
	}

	public void setJobsAccepted(String jobsAccepted) {
		this.jobsAccepted = jobsAccepted;
	}
	

	public String getJobsRequested() {
		return jobsRequested;
	}

	public void setJobsRequested(String jobsRequested) {
		this.jobsRequested = jobsRequested;
	}

	public String getFirebaseUid() {
		return firebaseUid;
	}

	public void setFirebaseUid(String firebaseUid) {
		this.firebaseUid = firebaseUid;
	}
	
	
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
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
	public String getSecondName() {
		return secondName;
	}
	public void setSecondName(String secondName) {
		this.secondName = secondName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getTrade() {
		return trade;
	}
	public void setTrade(String trade) {
		this.trade = trade;
	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	
	/**
	 * ToString method that prints out all the fields with the values for each field for a particular 
	 * instance.
	 * @return String, the fields and values for the fields.
	 */
	@Override
	public String toString() {
		return "Worker [id=" + id + ", firstName=" + firstName + ", secondName=" + secondName + ", address=" + address
				+ ", age=" + age + ", trade=" + trade + ", rating=" + rating + "]";
	}
	
	

}
