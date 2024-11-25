# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "4212ganteng",
  "name": "Aziz Muslim",
  "pasword": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "4212ganteng",
    "name": "Aziz Muslim"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "4212ganteng",
  "pasword": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "4212ganteng",
    "name": "Aziz Muslim",
    "token": "uuid"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Response Body (Success) :

Request Header :

- X-API-TOKEN : token

```json
{
  "data": {
    "username": "4212ganteng",
    "name": "Aziz Muslim"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "name": "Aziz Muslim", //tidak wajib
  "pasword": "rahasia" //tidak wajib
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "4212ganteng",
    "name": "Aziz Muslim"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "Ok"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```
