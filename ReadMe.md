# **ReadMe** 


# ** -- Yoga App --** 

An app to book yoga sessions in Savasana studio.</br>
The front part of the app uses Angular framework to run.
The back part of the app uses Java and Spring Boot framework to run.

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

First, get [this repository](https://github.com/Solau92/DevFS-Projet-5-Testez-une-application-full-stack.git) and import the project on your computer. 


## ** - Back part of the app - **

### **Prerequisites**

You need to install : 
* Java 11
* Maven 4.0.0
* MySQL 8.0.31

### **Installing** 

* [Install Java](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)
* [Install Maven](https://maven.apache.org/install.html)
* [Install MySQL](https://dev.mysql.com/downloads/mysql/)

After downloading the mysql 8 installer and installing it, you will be asked to configure the password for the default root account.

#### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/3.0.2/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/3.0.2/maven-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/3.0.2/reference/htmlsingle/#web)

#### Guides

The following guides illustrate how to use some features concretely:

* [Handling Form Submission](https://spring.io/guides/gs/handling-form-submission/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)

### **Running the app** 

Post installation of MySQL, Java and Maven, you will have to create the database. 
The default name of the database is "testfs", but if you want to change it, modify the *application.properties* file (in the *./back/src/main/resources* folder) and replace "testfs" in the property "spring.datasource.url" by the name you choose for your database.

Then set up the tables and data in the database. </br>
For this, for demonstration purpose, please run the sql commands present in the *data.sql* file under the *./back/src/main/resources* folder in the code base.
If you changed the name of the database, change it in this file too.

To run the app, go to the folder that contains the pom.xml file (*./back*) and execute the following command in which you have to replace "*%username%*" by your username and "%*password*%" by your password required to access your database : 
 `mvn spring-boot:run "-Dspring-boot.run.arguments=--spring.datasource.username=%username% --spring.datasource.password=%password%"`

### **Testing the app** 

To test the app, go to the folder that contains the pom.xml file and execute the following command : `mvn clean test`

The reports are available in the folder : *./back/target/site/jacoco* (open *index.html* file).

You can also access a summary of the report in the folder : *./coverage-reports* (file *jacoco-report.html*).

   **!! Warning !!** </br>
   When you run the tests, a database named "itestfs" is created. </br>
   **But if it already exists it is beforehand dropped.**


## **- Front part of the app - **

### Technology

This project uses [Angular](https://angular.io/) version 14.2.0.


### **Installing** 

Go to the folder that contains the angular.json file (*./front*) and install the node-module by running the command : `npm install`.

#### Reference Documentation

- [Angular documentation](https://angular.io/docs)
- [Npm documentation](https://docs.npmjs.com/)
- [Node JS documentation](https://nodejs.org/docs/latest/api/)

### **Running the app** 

Run the `npm run start` command.

And navigate to http://localhost:4200. 

NB : if you have run the *script.sql* file, you can use theses credentials to log in : 
   * user : yoga@studio.com
   * password : test!1234

### **Testing the app** 

#### Unitary / integration tests

To launch all the unit / integration tests, run the following command at the root of the front project : `npm run test`.

The reports are available in the folder : *./front/coverage/jest/lcov-report*  (open *index.html* file).

You can also access a summary of the report in the folder : *./coverage-reports* (file *jest-report.html*).

#### E2E tests

To launch all the tests, run the following command at the root of the front project : `npm run e2e`.

To generate the coverage report, run the commmand `npm run e2e:coverage`. </br>
The reports are available in the folder : *./front/coverage/lcov-report* (open *index.html* file).

You can also access a summary of the report in the folder : *./coverage-reports* (file *cypress-report.html*).


## ** - Version - **

1.0.0