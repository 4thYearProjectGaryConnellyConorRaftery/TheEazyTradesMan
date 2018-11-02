package com.projectBackEnd.dao;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.Query;

import com.projectBackEnd.model.Worker;

@ApplicationScoped
public class WorkerDAO {

	@Inject
	private EntityManager em;

	public List getAll() {

		return em.createNamedQuery("Worker.findAll", Worker.class).getResultList();

	}

	public Worker findById(final String id) {
		return em.find(Worker.class, id);
	}

	public void update(final Worker worker) {
		em.getTransaction().begin();
		em.merge(worker);
		em.getTransaction().commit();
	}

	public void create(final Worker worker) {
		em.getTransaction().begin();
		em.persist(worker);
		em.getTransaction().commit();
	}

	public void delete(final Worker worker) {
		em.getTransaction().begin();
		em.remove(worker);
		em.getTransaction().commit();
	}

}
