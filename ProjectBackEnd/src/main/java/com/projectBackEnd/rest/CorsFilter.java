package com.projectBackEnd.rest;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

/**
 * CorsFilter is an implementation of the ContainerResponseFilter interface.
 * This allows the application to specify the Cross Origin Resource Sharing
 * rules specific to this application.
 * @author Conor Raftery
 *
 */
@Provider
public class CorsFilter implements ContainerResponseFilter {

	/**
	 * Overrides the implemented method "filter", which is used in this 
	 * context to allow all origins to access this web-api.
	 */
	 @Override
	    public void filter(ContainerRequestContext requestContext, 
	      ContainerResponseContext responseContext) throws IOException {
	          responseContext.getHeaders().add(
	            "Access-Control-Allow-Origin", "*");
	          responseContext.getHeaders().add(
	            "Access-Control-Allow-Credentials", "true");
	          responseContext.getHeaders().add(
	           "Access-Control-Allow-Headers",
	           "origin, content-type, accept, authorization, token");
	          responseContext.getHeaders().add(
	            "Access-Control-Allow-Methods", 
	            "GET, POST, PUT, DELETE, OPTIONS, HEAD");
	    }

}
