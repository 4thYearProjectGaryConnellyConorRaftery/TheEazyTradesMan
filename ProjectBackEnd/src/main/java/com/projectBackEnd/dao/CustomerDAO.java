package com.projectBackEnd.dao;


import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.Query;

import com.projectBackEnd.model.Customer;



@ApplicationScoped
public class CustomerDAO {

	@Inject
	private EntityManager em;

	public List getAll() {

		return em.createNamedQuery("Customer.findAll", Customer.class).getResultList();
		
	}
	
	public Customer findById(final String id) {
        return em.find(Customer.class, id);
    }
	
	public void update(final Customer customer) {
        em.getTransaction().begin();
        em.merge(customer);
        em.getTransaction().commit();
    }
	
	public void create(final Customer customer) {
        em.getTransaction().begin();
        em.persist(customer);
        em.getTransaction().commit();
    }
	
	public void delete(final Customer customer) {
        em.getTransaction().begin();
        em.remove(customer);
        em.getTransaction().commit();
    }

}
