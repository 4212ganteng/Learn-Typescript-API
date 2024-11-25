# Address API Spec

## Craete Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": " jl. Biru laut IX no 4",
  "city": "Jakarta Timur",
  "province": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "24518"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": " jl. Biru laut IX no 4",
    "city": "Jakarta Timur",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "24518"
  }
}
```

Response Body (Failed) :

```json
{ "errors": "postal_code is requires" }
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": " jl. Biru laut IX no 4",
    "city": "Jakarta Timur",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "24518"
  }
}
```

Response Body (Failed) :

```json
{ "errors": "Address is not found" }
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": " jl. Biru laut IX no 4",
  "city": "Jakarta Timur",
  "province": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "24518"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": " jl. Biru laut IX no 4",
    "city": "Jakarta Timur",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "24518"
  }
}
```

Response Body (Failed) :

```json
{ "errors": "postal_code is requires" }
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{ "errors": "Address is not found" }
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": " jl. Biru laut IX no 4",
      "city": "Jakarta Timur",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "24518"
    },
    {
      "id": 2,
      "street": " jl. Biru laut IX no 4",
      "city": "Jakarta Timur",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "24518"
    },
    {
      "id": 3,
      "street": " jl. Biru laut IX no 4",
      "city": "Jakarta Timur",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "24518"
    }
  ]
}
```

Response Body (Failed) :

```json
{ "errors": "Contact is not found" }
```
