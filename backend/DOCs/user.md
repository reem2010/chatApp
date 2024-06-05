# User Endpoints
user authintication plays a critical role in protecting users data. it permits authenticated users only to access their resourses and user endpoints ensures that. user endpoints help in registering new accounts and securly logging in and out from accounts. 

##  /register
This endpoint creates a new user account by taking email, name, and password. The endpoint verifies that the email address doesn't already exist in the database, hashes the user's password, and then saves the user's data.
* **Method**: POST
*  **body parameters:** 
    * email - must be valid and unique
    * password - password for the user account
    * username - name of the user
#### **Request example**
``` http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
    "email": "email address",
    "username": "user name",
    "password": "password"
}
```
#### **Response example**
if user doesn't exist
``` json
{
  "message": "User <email> created successfully"
}
```
if user exists
``` json
{
  "message": "email is already exist"
}
```
#### **Error handling**
* 500 : if any error happens in registering a user


##  /login
This endpoint authenticates users by verifying their emails and passwords. once it makes sure user exists, it generates a secure JSON Web Token (JWT) and stores it in a cookie named access-token. This token is checked during each request to make sure user is authenticated.
* **Method**: POST
*  **body parameters:** 
    * email - must be valid and unique
    * password - password for the user account
#### **Request example**
``` http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
    "email": "email address",
    "password": "password"
}
```
#### **Response example**
``` json
{
    "message": "user logged in",
    "userId":  "user id"
}
```
#### **Error handling**
* 401 : Email does not exist
* 401 : Invalid password


##  /logout
helps the user to securly logout by clearing access-token cookie
* **Method**: POST
*  **body parameters:** no body parameters
    
#### **Request example**
``` http
POST http://localhost:3000/auth/logout
```
#### **Response example**
``` json
{
  "message": "logged out"
}
```