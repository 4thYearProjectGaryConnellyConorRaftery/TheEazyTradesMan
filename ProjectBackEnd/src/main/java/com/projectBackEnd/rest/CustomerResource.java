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
import com.projectBackEnd.model.Customer;

/**
 * CustomerResource class is responsible for the RESTful interactions with Customer objects.
 * This class uses Jax-rs to create java methods that can be mapped to HTTP methods.
 * The HTTP methods that interact with this class allow for CRUD operations to be performed
 * on the Customer objects over HTTP.
 * @author Gary Connelly
 *
 */

@ApplicationScoped
//@RequestScoped
@Path("customers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CustomerResource {

	/**
	 * Inject a CustomerDAO class to allow this class to indirectly communicate 
	 * with the database.
	 */
	@Inject
	private CustomerDAO customerDAO;

	/**
	 * Gets a handle on all of the Customer objects that exist in the database and
	 * returns them in a list in JSON format. This list can then be consumed and read
	 * by any client subscribed to this web service. 
	 * @return Response, the HTTP Response object containing the list of Customers.
	 */
	@GET
	public Response getAll() {
		return Response.ok(customerDAO.getAll()).build();
	}

	/**
	 * Gets a handle on the Customer object, if one exists with the given id that
	 * is passed in as a parameter. It then returns that Customer in the form of 
	 * a HTTP Response object.
	 * @param id, the id of the Customer object that is to be returned.
	 * @return Response, the HTTP Response object containing the Customer with the given id.
	 */
	@GET
	@Path("{id}")
	public Response getCustomer(@PathParam("id") final String id) {
		final Customer customer = customerDAO.findById(id);

		return Response.ok(customer).build(); // CORS filter problem.
	}

	/**
	 * Allows an existing Customer object to be modified. Takes the id of the Customer 
	 * to be modified, as well as a new Customer object that contains the updated information.
	 * The manually maps the existing Customer to the fields in the Customer that was passed in 
	 * as a parameter, using the Getter and Setter methods.
	 * @param id, the id of the Customer object to be modified.
	 * @param customer, the new Customer object with the updated information.
	 * @return Response, the HTTP status Response indicating whether the transaction succeeded or not.
	 */
	@PUT
	@Path("{id}")
	public Response update(@PathParam("id") final String id, final Customer customer) {
		final Customer updateCustomer = customerDAO.findById(id);

		updateCustomer.setFirstName(customer.getFirstName());
		updateCustomer.setSecondName(customer.getSecondName());
		updateCustomer.setAddress(customer.getAddress());
		updateCustomer.setAge(customer.getAge());
		updateCustomer.setFirebaseUid(customer.getFirebaseUid());
		customerDAO.update(updateCustomer);

		return Response.ok().build();
	}

	/**
	 * Allows for the creation of a Customer object on the database, using the 
	 * Customer object passed in as a parameter.
	 * @param customer, the Customer object to be created.
	 * @return Response, the HTTP status Response indicating whether the transaction succeeded or not.
	 */
	@POST
	public Response create(final Customer customer) {
		customerDAO.create(customer);

		return Response.ok().build();
	}

	/**
	 * Allows for the deletion of a Customer object on the database, using the 
	 * Customer object passed in as a parameter, and the id parameter to identify which
	 * Customer needs to be deleted.
	 * @param id, the id of the Customer object to be deleted.
	 * @return Response, the HTTP status Response indicating whether the transaction succeeded or not.
	 */
	@DELETE
	@Path("{id}")
	public Response delete(@PathParam("id") final String id) {
		final Customer getCustomer = customerDAO.findById(id);

		customerDAO.delete(getCustomer);

		return Response.ok().build();
	}

}
