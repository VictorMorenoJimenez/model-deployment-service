# Point Cloud Generator Proposal

> Microservice to create point cloud using realtime data from ROS or bag files.


## Description

The idea is to create a web service to create and storage point clouds.
These point clouds will be generated from on RGBA and odometry data.
The main sources of data are *bag* files (a ROS specific file type) and raw images + logs from the sensors.

The data is received by the server progressively via WebSockets or by sending an public link to the resource
(eg. Dropbox or Drive). Because of the size of point clouds, after processing the data the server will
save the point cloud in S3 or similar and will send an email to the client with the link to the new file.


## Technology Stack

### ROS

In order to create a point cloud from a bag file we need to install ROS ecosystem and the package rtabmap.
This ecosystem is used in robotics and it's a full suite of tools for mapping, location and sensors management.
It is a complex ecosystem full of dependencies so it will be a challenge to deploy. 

### Open3D

The previous technology (ROS) is not able to process raw data in batch. The main idea of that technology is to
have a close ecosystem that handles everything, from sensor data ingestion to visualization. Bag files are just
a sequence of ROS events bundled and compressed. If we want to create an fully-featured service, we need to
enable the user to create a point cloud from raw data (JPEG images and raw odometry data). To do so, we need
Open3D. Open3D is a library for 3D data processing. It will allow us to create a point cloud easily with just
a simple python scrips.

### NodeJS

The service will be written in Node-Express. It is not the easiest nor fastest option among backend frameworks 
but it has a huge support of the community and a vast set of tools for deployment, logging, monitoring, etc.
It is true that we need to run custom scripts and commands from the server and Python would be more suitable 
than Node in those cases, but NodeJS still a good option.


### Express

This is the most famous web framework for Node. It is well tested, minimalistic and has an astonishing number
of followers. I've choose it mostly by it's support and documentation. The performance of the web layer is not
important because the main workload correspond to the scripts of ROS and Open3D that will be running in background.


### Wiston

Every server from small to large needs a flexible logger. Wiston is a logging system that allows developers to
create complex loggers in few lines. It also has a variety of transport that can be used for example, to upload
the logs automatically to Sentry (another awesome tool) or store it in a database. 


### Babel

Node has support for ES6 Javascript since its last version (v12), due to compatibility I will use Node v10, so I
need Babel to compile ES2015+ Javascript code into code that node can run. Babel can also be used to use new
Javascript features that are not currently standard (eg. pattern matching).

### Swagger

It is really important to maintain a documentation of the API.
The API will be documented using Swagger and the docs will be 
served as a route in the server using swagger-ui-express.

### Dotenv

When we are dealing with sensible configuration variables it is an awful practice to store it in 
config files. The situation gets worse when we have different environments for the 
same service: development, staging, production. And each environment has its own configuration: database url,
ports, etc. Also, the nature of containers make it necessary to control the configuration with environment variables
because the services (web servers, databases, etc) can be deployed independently and they have to be connected with 
each other despite the url or port of each service for example.

In order to use this approach I will use dotenv which is an simple utility that reads a .env file and 
add export the environment variables automatically.


### Databases

As far as I don't know which cloud platform we will be using I cannot specify any storage system in particular.
But this service will need a distributed storage system (S3 and similar) for the point clouds.

In terms of databases, this service won't need any database. The files cannot be stored in any DB due to its size and
there is no authorization or user management system (it will be against the principles of microservices). This service only
have to process big files from different sources and store the result in an storage service.


### KUE

The steps to create a point cloud from an already recorded bag file are:

1. Download the bag file
2. Process it using rtabmap
3. Save it in a cloud storage

Because of this long running process it is necessary to have a queue system where the server will place the incoming jobs.
That system will be KUE and the queue state monitoring API will be created using KUE-UI.


### Socket.io



# Resources

https://farazdagi.com/2014/rest-and-long-running-jobs/
