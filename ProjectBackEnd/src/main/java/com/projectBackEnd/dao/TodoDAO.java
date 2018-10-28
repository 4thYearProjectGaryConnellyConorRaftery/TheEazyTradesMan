package com.projectBackEnd.dao;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.Query;

import com.projectBackEnd.model.Todo;

@ApplicationScoped
public class TodoDAO {

    @Inject
    private EntityManager em;

    public List getAll() {
    	
    	
        return em.createNamedQuery("Todo.findAll", Todo.class).getResultList();
    	
    }

    public Todo findById(final String id) {
        return em.find(Todo.class, id);
    }

    public void update(final Todo todo) {
        em.getTransaction().begin();
        em.merge(todo);
        em.getTransaction().commit();

    }

    public void create(final Todo todo) {
        em.getTransaction().begin();
        em.persist(todo);
        em.getTransaction().commit();
    }

    public void delete(final Todo todo) {
        em.getTransaction().begin();
        em.remove(todo);
        em.getTransaction().commit();
    }

}
