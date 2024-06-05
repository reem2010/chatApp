# Chat Endpoints

##  /chats/
This endpoint returns all the chats of the user.
* **Method**: GET
#### **Request example**
``` http
GET http://localhost:3000/chats
```
#### **Response example**
``` json
{
  [{"id":"chatID",
  "name":"chatName",
  "to":"id of reciever"}]
}
```

##  /chats/
This endpoint create a new chat for the user
* **Method**: POST
*  **body parameters:** 
    * recieverEmail - email of the other use you want to chat with
#### **Request example**
``` http
POST http://localhost:3000/chats/
Content-Type: application/json

{
    "recieverEmail": "email address"
}
```
#### **Response example**
``` json
{
    "message": "chat created successfully"
}
```
#### **Error handling**
* 404 : user you want to chat with doesn't exist


##  /chats/:chatId"
delete chat with it's id
* **Method**: DELETE
*  **path parameters:** chatId
    
#### **Request example**
``` http
DELETE  http://localhost:3000/chats/1
```
#### **Response example**
``` json
{
  "message": "chat deleted successfully"
}
```
#### **Error handling**
* 404 : chat doesn't exist