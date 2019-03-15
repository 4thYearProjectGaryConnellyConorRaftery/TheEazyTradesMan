package com.projectBackEnd.rest;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

/**
 * EntityManagerProducer allows any class that is composed of this class, 
 * to be able to access the methods needed to persist data. Any class that 
 * has an instance of an EntityManager can use the Hibernate OGM methods to 
 * interact with the database through the api-unit.
 * @author Gary Connelly
 *
 */

@ApplicationScoped
public class EntityManagerProducer {

	/**
	 * Returns an Entity Manager that allows the end point to interact with
	 * the database through the api-unit("restapi-unit").
	 * @return EntityManager.
	 */
    @Produces
    public EntityManager createEntityManager() {
        return Persistence
                .createEntityManagerFactory("restapi-unit")
                .createEntityManager();
    }

    public void close(final EntityManager entityManager) {
        entityManager.close();
    }

}
