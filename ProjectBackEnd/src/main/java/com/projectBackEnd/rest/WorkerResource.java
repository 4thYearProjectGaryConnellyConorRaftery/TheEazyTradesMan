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
		return Response.ok(workerDAO.getAll()).build();
	}

	@POST
	public Response create(final Worker worker) {
		workerDAO.create(worker);

		return Response.ok().build();
	}

}
