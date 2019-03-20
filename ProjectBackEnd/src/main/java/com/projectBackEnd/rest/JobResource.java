package com.projectBackEnd.rest;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import com.projectBackEnd.dao.CustomerDAO;
import com.projectBackEnd.dao.TodoDAO;
import com.projectBackEnd.model.Customer;

import com.projectBackEnd.dao.JobDAO;
import com.projectBackEnd.model.Job;

/**
 * JobResource class is responsible for the RESTful interactions with Job
 * objects. This class uses Jax-rs to create java methods that can be mapped to
 * HTTP methods. The HTTP methods that interact with this class allow for CRUD
 * operations to be performed on the Job objects over HTTP.
 * 
 * @author Gary Connelly
 *
 */

//@ApplicationScoped
@RequestScoped
@Path("jobs")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JobResource {

	/**
	 * Inject a JobDAO class to allow this class to indirectly communicate with the
	 * database.
	 */
	@Inject
	private JobDAO jobDAO;

	/**
	 * Gets a handle on all of the Job objects that exist in the database and
	 * returns them in a list in JSON format. This list can then be consumed and
	 * read by any client subscribed to this web service.
	 * 
	 * @return Response, the HTTP Response object containing the list of Jobs.
	 */
	@GET
	public Response getAll() {

		return Response.ok(jobDAO.getAll()).build();

	}

	/**
	 * Gets a handle on the Job object, if one exists with the given id that is
	 * passed in as a parameter. It then returns that Job in the form of a HTTP
	 * Response object.
	 * 
	 * @param id, the id of the Job object that is to be returned.
	 * @return Response, the HTTP Response object containing the Job with the given
	 *         id.
	 */
	@GET
	@Path("{id}")
	public Response getCustomer(@PathParam("id") final String id) {
		final Job job = jobDAO.findById(id);

		return Response.ok(job).build();
	}

	/**
	 * Allows an existing Job object to be modified. Takes the id of the Job to be
	 * modified, as well as a new Job object that contains the updated information.
	 * The manually maps the existing Job to the fields in the Job that was passed
	 * in as a parameter, using the Getter and Setter methods.
	 * 
	 * @param id, the id of the Job object to be modified.
	 * @param job, the new Job object with the updated information.
	 * @return Response, the HTTP status Response indicating whether the transaction
	 *         succeeded or not.
	 */
	@PUT
	@Path("{id}")
	public Response update(@PathParam("id") final String id, final Job job, @Context HttpHeaders headers) {
		MultivaluedMap<String, String> rh = headers.getRequestHeaders();
		List<String> token = rh.get("token");
		final Job updateJob = jobDAO.findById(id);
		for (String myToken : token) {
			System.out.println("-----------------" + myToken + "-----------------");
			if (myToken.contentEquals("xxxxxxx")) {
				updateJob.setTrade(job.getTrade());
				updateJob.setCustomer(job.getCustomer());
				updateJob.setDescription(job.getDescription());
				updateJob.setComplete(job.isComplete());
				updateJob.setRequests(job.getRequests());
				updateJob.setDate(job.getDate());
				updateJob.setLocation(job.getLocation());
				updateJob.setAccepted(job.isAccepted());
				updateJob.setContact(job.getContact());
				jobDAO.update(updateJob);

				return Response.ok().build();
			}
		}
		
		return Response.status(404).build();

	}

	/**
	 * Allows for the creation of a Job object on the database, using the Job object
	 * passed in as a parameter.
	 * 
	 * @param job, the Job object to be created.
	 * @return Response, the HTTP status Response indicating whether the transaction
	 *         succeeded or not.
	 */
	@POST
	public Response create(final Job job, @Context HttpHeaders headers) {
		MultivaluedMap<String, String> rh = headers.getRequestHeaders();
		List<String> token = rh.get("token");
		System.out.println("Inside post jobs");
		System.out.println(job.toString());
		
		for (String myToken : token) {
			System.out.println("-----------------" + myToken + "-----------------");
			if (myToken.contentEquals("xxxxxxx")) {
				jobDAO.create(job);

				return Response.ok().build();
			}
			
		}
		
		return Response.status(404).build();
		
		
	}

	/**
	 * Allows for the deletion of a Job object on the database, using the Job object
	 * passed in as a parameter, and the id parameter to identify which Job needs to
	 * be deleted.
	 * 
	 * @param id, the id of the Job object to be deleted.
	 * @return Response, the HTTP status Response indicating whether the transaction
	 *         succeeded or not.
	 */
	@DELETE
	@Path("{id}")
	public Response delete(@PathParam("id") final String id, @Context HttpHeaders headers) {
		
		MultivaluedMap<String, String> rh = headers.getRequestHeaders();
		List<String> token = rh.get("token");
		final Job getJob = jobDAO.findById(id);
		
		for (String myToken : token) {
			if (myToken.contentEquals("xxxxxxx")) {
				jobDAO.delete(getJob);

				return Response.ok().build();
			}
			
		}
		
		return Response.status(404).build();

		
	}

}
