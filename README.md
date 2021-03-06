
# <p align="center">TheEazyTradesMan</p>


<p align="center"><img src="https://user-images.githubusercontent.com/22517451/56621200-87d0b000-6623-11e9-9467-86e2c310d211.PNG" width="500" height="500"></p>



## [Contents](#contents)
* [Project Details](#details)
* [Introduction](#intro)
* [Features](#features)
* [Video Demo](#demo)
* [Dissertation Abstract](#abstract)
* [Dissertation](#dissertation)
* [App Preview](#preview)
* [Deployment](#deploy)
* [Relevant Documentation](#documentation)
* [Architecture](#arc) 
* [Prototyping](#prototype)
* [Project Wiki](#wiki)



# Project Details<a name = "details"></a>

| Project Details   |     |
| --- | --- |
| **Course** | BSc (Hons) in Software Development  |
| **Module** |  Applied Project and Minor Dissertation |
| **College** | [GMIT](http://www.gmit.ie/) Galway |
| **Students** | [Gary Connelly](https://www.linkedin.com/in/gary-connelly-555106170/)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; G00336837<br/>[Conor Raftery](https://www.linkedin.com/in/conor-raftery-090b88150/)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; G00274094 |
| **Project Supervisor** | Mr Gerard Harrison |
| **Module Supervisor** | Dr John Healy |
| **Project Title** | TheEazyTradesMan |

[Top](#contents) 
# Introduction<a name = "intro"></a>
For the final year project, we decided to create a dynamic web-application that connects trade workers with customers. Working as a team and following the Agile methodology, we developed an application that allows customers to post any jobs they need to have done that would require a tradesman(for example, to service a car), onto a platform where trades workers can view and request to do the job. The corresponding customer that posted the job can then accept of reject the workers request. It is a three-tier application, using MongoDB and Firebase as the Data Tier, Java Jax-rs for the Logic Tier, and Angular 6 for the Presentation Tier.

[Top](#contents)

# Features<a name = "features"></a>
The main features of this application can be broken down into two sub-sections; Customer oriented features and Tradesman oriented features. 

## Customer Oriented Features
* Browse other customer job listings.
* Post their own job listing.
* Edit the jobs they posted. 
* View the profiles of the workers that requested their patricular job listings.
* Accept/Ignore these job requests.
* Rate the worker/s that completed the job.
* Remove job listings they posted.

## Worker Oriented Features
* Browse job listings.
* View the location of individual job listings on Google Maps.
* Request jobs.
* Edit their user profile.
* View the jobs they requested, with the status of each request.

[Top](#contents) 

# Video Demo<a name = "demo"></a>

## Brief Video Demo
<kbd>[![2 Minute Video](https://user-images.githubusercontent.com/22517432/56829713-66a6d400-685c-11e9-9398-ca6451145dc3.PNG)](https://youtu.be/JxoHPQVQr_A)</kbd>

## In-Depth Video Demo
<kbd>[![Indepth Video](https://user-images.githubusercontent.com/22517432/56829616-29424680-685c-11e9-9885-35d9364a9d11.PNG)](https://youtu.be/zbEItHRyYdw)</kbd>

[Top](#contents) 

# Dissertation Abstract<a name = "abstract"></a>
This dissertation is based on the project 'TheEazyTradesman', which was completed as part of the module 'Applied Project and Minor Dissertation'. This project is a dynamic web-application that connects trade workers with customers. It is a three-tier application, using MongoDB and Firebase for the Data Tier, Java JAX-RS for the Logic Tier, and Angular 6 for the Presentation Tier. These technologies have been at the forefront of web applications development in the past decade.

In recent years, there has been an increasing demand for scalable systems in the age of big data. Through this demand, NoSQL Database technologies have emerged. Over the past few decades, SQL has been the dominant database technology, however, the relational nature of SQL technology complicates data scalability beyond practicality.

The objectives of this study was to incorporate the technologies mentioned above with a non-relational database. An investigation took place that researched the feasibility of using established technologies with the Hibernate Persistence Engine to interact with a NoSQL database. An additional objective was to gain an understanding of the complexities behind the development of a full stack dynamic web application. 

To conduct this investigation, an agile approach was taken to develop a system that uses a MongoDB database with the Hibernate OGM(Object Grid Mapping) persistence engine to create a RESTful service using the JAX-RS Java API that can be consumed by an Angular web application.

Throughout this investigation, it was found that the Hibernate OGM persistence engine functioned well in conjunction with a NoSQL database. Data transactions were easily managed once the developer had a basic understanding of the JPA(Java Persistence API).

Throughout the development process, a thorough understanding was gained of the full stack development life cycle. The various technical skills needed at the specific layers of the stack were obtained or improved as the application evolved. It was realised late into the development of the application that a better implementation of security features may be needed going forward. 

[Top](#contents) 

# Dissertation<a name = "dissertation"></a>

Click on the image below to view the dissertation.
<kbd>[![Dissertation](https://user-images.githubusercontent.com/22517432/56830288-e08b8d00-685d-11e9-8d16-0d18a1e35c0d.PNG)](https://github.com/4thYearProjectGaryConnellyConorRaftery/Dissertation/blob/master/Dissertation.pdf)</kbd>


[Top](#contents) 

# Application Preview<a name = "preview"></a>

[Application Preview.](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/Application-Preview)

[Top](#contents) 

# Deployment<a name = "deploy"></a>
This application is currently deployed on an AWS instance. Fore more information about how this was configured, please take a look at the [AWS Configuration](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/AWS-Configuration) page of this repository's wiki.

## Deploy Locally

If you wish to deploy this project locally, please see the [Developer Guide](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/Developer-Guide) in this repository's wiki.
## Link to hosted app

[TheEazyTradesMan](http://3.16.111.121:4200/login)

[Top](#contents) 

# Relevant Documentation<a name = "documentation"></a>

Relevant documentation has been compiled to this [Wiki](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/Documentation) page.

[Top](#contents) 

# Architecture<a name = "arc"></a>
[Architecture](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/Architecture)

### Data Tier
[Data Tier.](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/Data-Tier)
### Logic Tier
[Logic Tier.](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/Logic-Tier)
### Presentation Tier
[Presentation Tier.](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/Presentation-Tier)

[Top](#contents) 

# Prototyping<a name = "prototype"></a>
[Prototyping](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki/Prototyping)

[Top](#contents) 


# Wiki<a name = "wiki"></a>
[Project Wiki](https://github.com/4thYearProjectGaryConnellyConorRaftery/TheEazyTradesMan/wiki)

[Top](#contents) 
