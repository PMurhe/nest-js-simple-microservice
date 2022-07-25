# nest-js-simple-microservice
**Simple Microservice using NestJS**

**Problem Statement : Create a simple microservice in node using nest-js with db as postgre-sql. Create Few CRUD API's to Create as well as View a Company and a Team.
Use Docker to run your application & database
API's should validate a JWT token before allowing access to the caller.**

**APIs to be exposed:**
1. Create Company
2. Create Team (Should have company ID in path)
3. GET Company by ID
4. Search company by the name
5. Get All Teams (Return all teams as an array grouped within company object)


**Entities Involved: Company & Team**
**Relationship: Company --> Team : One-Many, Team --> Company : Many-One
Database : Postgre SQL**


**Execute below command from terminal from the current project directory**:

**docker-compose up**

This will start the project 
API's will be up on Port 8080
Postman Collection is added in the repo.
