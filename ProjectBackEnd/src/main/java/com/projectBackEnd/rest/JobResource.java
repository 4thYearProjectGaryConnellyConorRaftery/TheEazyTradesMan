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

import com.projectBackEnd.dao.CustomerDAO;
import com.projectBackEnd.dao.TodoDAO;
import com.projectBackEnd.model.Customer;

import com.projectBackEnd.dao.JobDAO;
import com.projectBackEnd.model.Job;

@ApplicationScoped
@Path("jobs")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JobResource {
	
	@Inject
	private JobDAO jobDAO;
	
	@GET
	public Response getAll() {
		
		return Response.ok(jobDAO.getAll()).build();
	}
	
	@GET
    @Path("{id}")
    public Response getCustomer(@PathParam("id") final String id) {
        final Job job = jobDAO.findById(id);

        return Response.ok(job).build();
    }
	
	@PUT
    @Path("{id}")
    public Response update(@PathParam("id") final String id, final Job job) {
        final Job updateJob = jobDAO.findById(id);

        updateJob.setTrade(job.getTrade());
        updateJob.setCustomer(job.getCustomer());
        updateJob.setDescription(job.getDescription());
        updateJob.setComplete(job.isComplete());
       // updateJob.setRequests(job.getRequests());
        jobDAO.update(updateJob);
       

        return Response.ok().build();
    }
	
	@POST
    public Response create(final Job job) {
		System.out.println(job.toString());
		jobDAO.create(job);
		
        return Response.ok().build();
    }
	
	@DELETE
	@Path("{id}")
	public Response delete(@PathParam("id") final String id) {
		final Job getJob = jobDAO.findById(id);

		jobDAO.delete(getJob);

		return Response.ok().build();
	}


}
