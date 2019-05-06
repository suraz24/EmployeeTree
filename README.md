# EmployeeTree
This application displays the employee data in hierarchical format.

**Demo Link**: http://employeetree.s3-website.us-east-2.amazonaws.com/
> Note: At the moment, only adding a new employee is implemented. Also, they must have a manager. The next sections lists some development work left to be done.

**Frontend**: his app uses React, antd library for several component and Apollo client to perform all the graphql queries. The frontend is hosted in AWS S3 bucket and served as a static website. 
 
 **Backend**
Backend is a nodejs appication which uses Express and Express-graphql library. It is hosted in the AWS ElasticBeanstalk. The app uses MongoDB to store the data.

# Architecture Diagram
![Alt text](/Architecture.png?raw=true "Architecture")

# Running app locally
* Clone the repo using following command:
  ```git clone https://github.com/suraz24/EmployeeTree.git```
* To setup the backend, `cd` into server
* Once inside the folder, if you **have docker** installed, run the commands:
  ```
    docker build -f Dockerfile -t emptree-server . 
    docker run -p 8081:8081 emptree-server
  ```
* If you **don't have docker** installed, run the following commands:
   ```
    npm i
    npm start
  ```
 * The backend should now be running on localhost:8081. To test it, browse to localhost:8081/graphql. The graphiql interface should be displayed
 
 * To setup frontend, navigate to client folder using following command:
 ``` 
  cd ..
  cd client/
 ```
 * Once inside the folder, if you **have docker** installed, run the commands:
  ```
    docker build -f Dockerfile -t emptree-client . 
    docker run -p 3000:3000 emptree-client
  ```
* If you **don't have docker** installed, run the following commands:
   ```
    npm i
    npm start
  ```
* The frontend should now be running on localhost:3000. To test it, browse to localhost:3000

> Note: At the moment, only adding a new employee is implemented. Also, they must have a manager. The next sections lists some development work left to be done.
  
  

# Things to be implemented
* Currently, the list can have only one root node.
* Display the details for an employee when you click on a node
* Edit and delete employee functionality for employee
* Docker compose file
* Unit tests
