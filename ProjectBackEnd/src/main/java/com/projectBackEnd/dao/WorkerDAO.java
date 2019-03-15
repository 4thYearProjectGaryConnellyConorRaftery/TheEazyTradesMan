package com.projectBackEnd.dao;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.Query;

import com.projectBackEnd.model.Worker;
/**
 * WorkerDAO class handles the persistence of Worker objects to the mongo database.
 * This class uses Hibernate OGM(Object Grid Mapping) to handle the mappings of objects
 * between BSON(the mongodb syntax) and java syntax.
 * @author Gary Connelly
 *
 */

@ApplicationScoped
public class WorkerDAO {

	/**
	 * Injects an Entity manager dependency into the class. 
	 * This Entity manager can be used to persist objects to a database
	 * and also handles the object mappings.
	 */
	@Inject
	private EntityManager em;

	/**
	 * Gets a handle on all of the Worker objects that exist in the database,
	 * maps them to the Worker class, and returns them in a list.
	 * @return List, the list of all Workers that exist in the database.
	 */
	public List getAll() {

		return em.createNamedQuery("Worker.findAll", Worker.class).getResultList();

	}

	/**
	 * Gets a handle on the Worker object in the database that has a
	 * particular id. If such a Worker exists, it is mapped to the Worker
	 * class and returned as a Worker object.
	 * @param id
	 * @return Worker, the Worker object, if one exists in the database with the same id as the given parameter.
	 */
	public Worker findById(final String id) {
		return em.find(Worker.class, id);
	}

	/**
	 * Allows an existing Worker object in the database to be modified.
	 * Uses the Entity manager to begin a transaction, and merges the existing 
	 * Worker in the database with the Worker object that was passed in as a parameter,
	 * then ends the Entity manager transaction.
	 * @param worker
	 */
	public void update(final Worker worker) {
		em.getTransaction().begin();
		em.merge(worker);
		em.getTransaction().commit();
	}

	/**
	 * Allows for the creation of a new Worker object in the mongo database.
	 * Uses Entity manager to begin a transaction. and persists the Worker
	 * object that was passed in as a parameter before closing the transaction.
	 * @param worker
	 */
	public void create(final Worker worker) {
		em.getTransaction().begin();
		em.persist(worker);
		em.getTransaction().commit();
	}

	/**
	 * Allows for the deletion of Worker objects in the mongo database.
	 * Uses Entity manager to begin a transaction, then removes the Worker
	 * object that was passed in as a parameter before closing the transaction.
	 * @param worker
	 */
	public void delete(final Worker worker) {
		em.getTransaction().begin();
		em.remove(worker);
		em.getTransaction().commit();
	}

}
