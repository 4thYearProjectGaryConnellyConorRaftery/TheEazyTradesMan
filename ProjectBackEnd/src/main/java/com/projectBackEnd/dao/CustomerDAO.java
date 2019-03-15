package com.projectBackEnd.dao;


import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.Query;

import com.projectBackEnd.model.Customer;
/**
 * CustomerDAO class handles the persistence of Customer objects to the mongo database.
 * This class uses Hibernate OGM(Object Grid Mapping) to handle the mappings of objects
 * between BSON(the mongodb syntax) and java syntax.
 * @author Gary Connelly
 *
 */


@ApplicationScoped
public class CustomerDAO {

	/**
	 * Injects an Entity manager dependency into the class. 
	 * This Entity manager can be used to persist objects to a database
	 * and also handles the object mappings.
	 */
	@Inject
	private EntityManager em;

	/**
	 * Gets a handle on all of the Customer objects that exist in the database,
	 * maps them to the Customer class, and returns them in a list.
	 * @return List, the list of all Customers that exist in the database.
	 */
	public List getAll() {

		return em.createNamedQuery("Customer.findAll", Customer.class).getResultList();
		
	}
	
	/**
	 * Gets a handle on the Customer object in the database that has a
	 * particular id. If such a Customer exists, it is mapped to the Customer
	 * class and returned as a Customer object.
	 * @param id
	 * @return Customer, the Customer object, if one exists in the database with the same id as the given parameter.
	 */
	public Customer findById(final String id) {
        return em.find(Customer.class, id);
    }
	
	/**
	 * Allows an existing Customer object in the database to be modified.
	 * Uses the Entity manager to begin a transaction, and merges the existing 
	 * Customer in the database with the Customer object that was passed in as a parameter,
	 * then ends the Entity manager transaction.
	 * @param customer
	 */
	public void update(final Customer customer) {
        em.getTransaction().begin();
        em.merge(customer);
        em.getTransaction().commit();
    }
	
	/**
	 * Allows for the creation of a new Customer object in the mongo database.
	 * Uses Entity manager to begin a transaction. and persists the Customer
	 * object that was passed in as a parameter before closing the transaction.
	 * @param customer
	 */
	public void create(final Customer customer) {
        em.getTransaction().begin();
        em.persist(customer);
        em.getTransaction().commit();
    }
	
	/**
	 * Allows for the deletion of Customer objects in the mongo database.
	 * Uses Entity manager to begin a transaction, then removes the Customer
	 * object that was passed in as a parameter before closing the transaction.
	 * @param customer
	 */
	public void delete(final Customer customer) {
        em.getTransaction().begin();
        em.remove(customer);
        em.getTransaction().commit();
    }

}
