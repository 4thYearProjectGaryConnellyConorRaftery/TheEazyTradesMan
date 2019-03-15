package com.projectBackEnd.rest;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * This class extends Application which gives this Project access to meta-data
 * for using Jax-rs methods.
 * @author Conor Raftery
 *
 */

@ApplicationPath("/")
public class RestApplication extends Application {

}
