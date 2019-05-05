# EmployeeTree
This application displays the employee data in hierarchical format. For the frontend this app uses React, antd library for several component and Apollo client to perform all the graphql queries. The frontend is hosted in AWS S3 bucket and served as a static website. Backend is a nodejs appication which uses Express and Express-graphql library. It is hosted in the AWS ElasticBeanstalk. The app uses MongoDB to store the data.

# Deployed app
The deployed version of the app can be accessed via: http://employeetree.s3-website.us-east-2.amazonaws.com/

# Architecture Diagram
![Alt text](/Architecture.png?raw=true "Architecture")

# Running app locally
* Clone the repo using following command:
  ```git clone https://github.com/suraz24/EmployeeTree.git```
* To setup the backend, `cd` into server
* Once inside the folder, if you have docker installed, run the commands:
  ```
    docker build -f Dockerfile -t emptree-server . 
    docker run -p 8081:8081 emptree-server
  ```

# Things left to be implemented
* Currently, the list can have only one root node.
* Display the details for an employee when you click on a node
* Edit and delete employee functionality for employee
* Docker compose file
