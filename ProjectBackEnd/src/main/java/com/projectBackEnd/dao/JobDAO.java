package com.projectBackEnd.dao;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.Query;

import com.projectBackEnd.model.Customer;
import com.projectBackEnd.model.Job;
/**
 * JobDAO class handles the persistence of Job objects to the mongo database.
 * This class uses Hibernate OGM(Object Grid Mapping) to handle the mappings of objects
 * between BSON(the mongodb syntax) and java syntax.
 * @author Gary Connelly
 *
 */

@ApplicationScoped
public class JobDAO {
	
	/**
	 * Injects an Entity manager dependency into the class. 
	 * This Entity manager can be used to persist objects to a database
	 * and also handles the object mappings.
	 */
	@Inject
	private EntityManager em;
	
	/**
	 * Gets a handle on all of the Job objects that exist in the database,
	 * maps them to the Job class, and returns them in a list.
	 * @return List, the list of all Jobs that exist in the database.
	 */
	public List getAll() {

		return em.createNamedQuery("Job.findAll", Job.class).getResultList();
		
	}
	
	/**
	 * Gets a handle on the Job object in the database that has a
	 * particular id. If such a Job exists, it is mapped to the Job
	 * class and returned as a Job object.
	 * @param id
	 * @return Job, the Job object, if one exists in the database with the same id as the given parameter.
	 */
	public Job findById(final String id) {
        return em.find(Job.class, id);
    }
	
	/**
	 * Allows an existing Job object in the database to be modified.
	 * Uses the Entity manager to begin a transaction, and merges the existing 
	 * Job in the database with the Job object that was passed in as a parameter,
	 * then ends the Entity manager transaction.
	 * @param job
	 */
	public void update(final Job job) {
        em.getTransaction().begin();
        em.merge(job);
        em.getTransaction().commit();
    }
	
	/**
	 * Allows for the creation of a new Job object in the mongo database.
	 * Uses Entity manager to begin a transaction. and persists the Job
	 * object that was passed in as a parameter before closing the transaction.
	 * @param job
	 */
	public void create(final Job job) {
        em.getTransaction().begin();
        em.persist(job);
        em.getTransaction().commit();
    }
	
	/**
	 * Allows for the deletion of Job objects in the mongo database.
	 * Uses Entity manager to begin a transaction, then removes the Job
	 * object that was passed in as a parameter before closing the transaction.
	 * @param job
	 */
	public void delete(final Job job) {
        em.getTransaction().begin();
        em.remove(job);
        em.getTransaction().commit();
    }


}
