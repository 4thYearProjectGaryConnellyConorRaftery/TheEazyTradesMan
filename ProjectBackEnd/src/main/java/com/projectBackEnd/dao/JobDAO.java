package com.projectBackEnd.dao;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.Query;

import com.projectBackEnd.model.Customer;
import com.projectBackEnd.model.Job;

@ApplicationScoped
public class JobDAO {
	
	@Inject
	private EntityManager em;
	
	public List getAll() {

		return em.createNamedQuery("Job.findAll", Job.class).getResultList();
		
	}
	
	public Job findById(final String id) {
        return em.find(Job.class, id);
    }
	
	public void update(final Job job) {
        em.getTransaction().begin();
        em.merge(job);
        em.getTransaction().commit();
    }
	
	public void create(final Job job) {
        em.getTransaction().begin();
        em.persist(job);
        em.getTransaction().commit();
    }
	
	public void delete(final Job job) {
        em.getTransaction().begin();
        em.remove(job);
        em.getTransaction().commit();
    }


}
