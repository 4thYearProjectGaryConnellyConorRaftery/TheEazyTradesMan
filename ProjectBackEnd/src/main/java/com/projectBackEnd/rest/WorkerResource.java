package com.projectBackEnd.rest;

import javax.enterprise.context.ApplicationScoped;
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

@ApplicationScoped
@Path("workers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WorkerResource {
	@Inject
	private WorkerDAO workerDAO;

	@GET
	public Response getAll() {
		return Response.ok(workerDAO.getAll())
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}
	
	@GET
    @Path("{id}")
    public Response getWorker(@PathParam("id") final String id) {
        final Worker worker = workerDAO.findById(id);

        return Response.ok(worker)
        		.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
    }
	
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
        workerDAO.update(updateWorker);
        
		return Response.ok()
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}

	@POST
	public Response create(final Worker worker) {
		workerDAO.create(worker);

		return Response.ok()
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}
	
	 @DELETE
	    @Path("{id}")
	    public Response delete(@PathParam("id") final String id) {
	        final Worker getWorker = workerDAO.findById(id);

	        workerDAO.delete(getWorker);

	        return Response.ok()
	        		.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
					.allow("OPTIONS").build();
	    }

}
