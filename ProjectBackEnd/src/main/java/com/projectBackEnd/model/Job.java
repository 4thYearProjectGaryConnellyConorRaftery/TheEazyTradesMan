package com.projectBackEnd.model;

import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

import org.hibernate.annotations.GenericGenerator;


@Entity
@NamedQuery(name = "Job.findAll", query = "SELECT j FROM Job j")
public class Job {
	
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	private String trade;
	private String description;
	private String customer;
	private boolean isComplete;
	private String requests;
	private String location;
	private String date;
	
	
	
	
	
	

	


	

	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	public String getRequests() {
		return requests;
	}


	public void setRequests(String requests) {
		this.requests = requests;
	}


	public boolean isComplete() {
		return isComplete;
	}


	public void setComplete(boolean isComplete) {
		this.isComplete = isComplete;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getTrade() {
		return trade;
	}


	public void setTrade(String trade) {
		this.trade = trade;
	}

	
	public String getCustomer() {
		return customer;
	}


	public void setCustomer(String customer) {
		this.customer = customer;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	@Override
	public String toString() {
		return "Job [id=" + id + ", trade=" + trade + ", description=" + description + ", customer=" + customer
				+ ", isComplete=" + isComplete  +"]";
	}
	
	
	
	
	
	
	
	

}
