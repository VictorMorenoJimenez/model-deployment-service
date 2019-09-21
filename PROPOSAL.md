# MDS (Model Deployment Service) Proposal

> Microservice to storage machine learning models and make predictions on demand.


## Description

The idea is to create a web service to create and store machine learning models.
These models will be in a standard format [ONNX](https://onnx.ai/). This format allows data scientists and ML practitioners
to export models from a variety of libraries: [SKLearn](https://scikit-learn.org/), 
[Tensorflow](https://www.tensorflow.org/) ... into a common format.
The pretrained model is received by the server as multi-part data and the prediction request using
a REST API or via [WebSockets](https://developer.mozilla.org/docs/Web/API/WebSockets_API).


## Technology Stack

### [ONNX](https://onnx.ai/)

[ONNX](https://onnx.ai/) is an ecosystem for interchangeable ML models. It provides tools for exporting, reading and standardize models
from different ML frameworks. This tool will provide the microservice the ability to handle almost all kinds of 
models, from Neural Networks to linear regression models.


### [NodeJS](https://nodejs.org)

The service will be written in Node-Express. It is not the easiest or fastest option among backend frameworks 
but it has a huge support of the community and a vast set of tools for deployment, logging, monitoring, etc.
We indeed need to run custom scripts and commands from the server and Python would be more suitable 
than Node in those cases, but [NodeJS](https://nodejs.org) still a good option.


### [Express](http://expressjs.com)

This is the most famous web framework for Node. It is well tested, minimalistic and has an astonishing number
of followers. I've chosen it mostly by its support and documentation. The performance of the web layer is not
important because the main workload corresponds to the predictions
made by [ONNX.js](https://github.com/microsoft/onnxjs).

### [Winston](https://github.com/winstonjs/winston)

Every server from small to large needs a flexible logger. Winston is a logging system that allows developers to
create complex loggers in a few lines. It also has a variety of transport that can be used, for example, to upload
the logs automatically to Sentry (another awesome tool) or store it in a database. In this case, we will be storing
the logs as text files in the directory ./logs.


### [Babel](https://babeljs.io/)

Node has support for ES6 Javascript since its last version (v12), due to compatibility I will use Node v10, so I
need Babel to compile ES2015+ Javascript code into code that node can run. Babel can also be used to use new
Javascript features that are not currently standard (eg. [pattern matching](https://github.com/tc39/proposal-pattern-matching)).

### [Swagger](https://swagger.io/)

It is really important to maintain documentation of the API.
The API will be documented using [Swagger](https://swagger.io/) and the docs will be 
served as a route in the server using [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express).

### [Dotenv](https://www.npmjs.com/package/dotenv)

When we are dealing with sensible configuration variables it is an awful practice to store it in config files. The situation gets worse when we have different environments for the same service: development, staging, production. And each environment has its configuration: database URL, ports, etc. Also, the nature of containers makes it necessary to control the configuration with environment variables
because the services (web servers, databases, etc) can be deployed independently and they have to be connected with 
each other despite the URL or port of each service for example.

To use this approach I will use [dotenv](https://www.npmjs.com/package/dotenv) which is a simple utility that 
reads a .env file and exports the environment variables automatically.


### Storage

As I don't know which cloud platform we will be using I cannot specify any storage system in particular.
But this service will need a distributed storage system (S3 and similar) for the point clouds.

In terms of databases, models will have a unique identifier and some metadata that will be useful for the main functionalities.
As [ONNX](https://onnx.ai/) is a new standard that is changing, it is not desirable to create a fixed scheme for model metadata. For that reason, I will use [MongoDB](https://www.mongodb.com/) for storing metadata along with S3 or similar to store the actual model.


### [KUE](https://github.com/Automattic/kue)

When a model has a huge number of parameters eg. Neural Network, making predictions could be very slow.
Ideally, when a client requests a prediction with a single row as input the response would be sent back after it is processed.
But, when a client requests a prediction over multiples rows, the server should reply immediately (203 code) and the task should be
enqueued.

Because of these long-running tasks, it is necessary to have a queue system where the server will place the incoming jobs.
That system will be [KUE](https://github.com/Automattic/kue) and the queue monitoring API will be created 
using [KUE-UI](https://github.com/stonecircle/kue-ui).


### [Socket.io](http://socket.io)

A better approach than the REST API proposed above would be using 
[WebSockets](https://developer.mozilla.org/docs/Web/API/WebSockets_API) 
to keep a connection between the client and the server alive while 
making predictions. Using this approach the client can keep sending prediction 
requests to the server and the server can send back the responses as it is been processed.
