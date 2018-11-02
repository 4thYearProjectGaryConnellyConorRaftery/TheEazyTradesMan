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

@ApplicationScoped
@Path("customers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CustomerResource {
	@Inject
	private CustomerDAO customerDAO;

	@GET
	public Response getAll() {
		return Response.ok(customerDAO.getAll()).build();
	}
	
	@GET
    @Path("{id}")
    public Response getCustomer(@PathParam("id") final String id) {
        final Customer customer = customerDAO.findById(id);

        return Response.ok(customer).build();
    }
	
	@POST
    public Response create(final Customer customer) {
		customerDAO.create(customer);
       
        return Response.ok().build();
    }

}
