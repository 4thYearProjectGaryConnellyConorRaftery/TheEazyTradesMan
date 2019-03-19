package com.projectBackEnd.rest;

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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.projectBackEnd.dao.WorkerDAO;
import com.projectBackEnd.model.Worker;

/**
 * WorkerResource class is responsible for the RESTful interactions with Worker objects.
 * This class uses Jax-rs to create java methods that can be mapped to HTTP methods.
 * The HTTP methods that interact with this class allow for CRUD operations to be performed
 * on the Worker objects over HTTP.
 * @author Gary Connelly
 *
 */

@ApplicationScoped
//@RequestScoped
@Path("workers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WorkerResource {
	
	/**
	 * Inject a WorkerDAO class to allow this class to indirectly communicate 
	 * with the database.
	 */
	@Inject
	private WorkerDAO workerDAO;

	/**
	 * Gets a handle on all of the Worker objects that exist in the database and
	 * returns them in a list in JSON format. This list can then be consumed and read
	 * by any client subscribed to this web service. 
	 * @return Response, the HTTP Response object containing the list of Workers.
	 */
	@GET
	public Response getAll() {
		//System.out.println("Worker firebase id: ---> ");
		return Response.ok(workerDAO.getAll()).build();
	}
	
	/**
	 * Gets a handle on the Worker object, if one exists with the given id that
	 * is passed in as a parameter. It then returns that Worker in the form of 
	 * a HTTP Response object.
	 * @param id, the id of the Worker object that is to be returned.
	 * @return Response, the HTTP Response object containing the Worker with the given id.
	 */
	@GET
    @Path("{id}")
    public Response getWorker(@PathParam("id") final String id) {
        final Worker worker = workerDAO.findById(id);
        System.out.println("-------------------" + worker.toString());

        return Response.ok(worker).build();
    }
	
	/**
	 * Allows an existing Worker object to be modified. Takes the id of the Worker 
	 * to be modified, as well as a new Worker object that contains the updated information.
	 * The manually maps the existing Worker to the fields in the Worker that was passed in 
	 * as a parameter, using the Getter and Setter methods.
	 * @param id, the id of the Worker object to be modified.
	 * @param worker, the Worker object to be updated.
	 * @return Response, the HTTP status Response indicating whether the transaction succeeded or not.
	 */
	@PUT
    @Path("{id}")
    public Response update(@PathParam("id") final String id, final Worker worker) {
        final Worker updateWorker = workerDAO.findById(id);
        updateWorker.setFirstName(worker.getFirstName());
        updateWorker.setSecondName(worker.getSecondName());
        updateWorker.setAddress(worker.getAddress());
        updateWorker.setAge(worker.getAge());
        updateWorker.setTrade(worker.getTrade());
        updateWorker.setRating(worker.getRating());
        updateWorker.setPhoneNumber(worker.getPhoneNumber());
        updateWorker.setEmail(worker.getEmail());
        updateWorker.setWebsite(worker.getWebsite());
        updateWorker.setFirebaseUid(worker.getFirebaseUid());
        updateWorker.setJobsRequested(worker.getJobsRequested());
        updateWorker.setJobsAccepted(worker.getJobsAccepted());
        workerDAO.update(updateWorker);
        
		return Response.ok().build();
	}

	/**
	 * Allows for the creation of a Worker object on the database, using the 
	 * Worker object passed in as a parameter.
	 * @param worker, the Worker object to be created.
	 * @return Response, the HTTP status Response indicating whether the transaction succeeded or not.
	 */
	@POST
	public Response create(final Worker worker) {
		workerDAO.create(worker);

		return Response.ok().build();
	}
	
	/**
	 * Allows for the deletion of a Worker object on the database, using the 
	 * Worker object passed in as a parameter, and the id parameter to identify which
	 * Worker needs to be deleted.
	 * @param id, the id of the Worker object to be deleted.
	 * @return Response, the HTTP status Response indicating whether the transaction succeeded or not.
	 */
	 @DELETE
	    @Path("{id}")
	    public Response delete(@PathParam("id") final String id) {
	        final Worker getWorker = workerDAO.findById(id);

	        workerDAO.delete(getWorker);

	        return Response.ok().build();
	    }

}
