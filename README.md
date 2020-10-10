# faveones-backend

Node.js + MySQL API Para administración de usuarios, Autenticación y Registro

#
## Registro POST api/user/register

El formulario se envia como JSON

    {
    "firstName": "joaquin",
    "lastName":  "fenix",
    "username":  "joaquin",
    "password":  "joker.*2020"
    }
#
## Autenticar user POST api/user/authenticate

El formulario se envia como JSON

    {
    "username": "joaquin",
    "password": "joker.*2020"
    }

El cual retorna un JSON similar a este

    {
    "id": 1,
    "firstName": "joaquin",
    "lastName":  "fenix",
    "username":  "joaquin",
    "createdAt": "2020-10-05T20:09:46.000Z",
    "updatedAt": "2020-10-05T20:09:46.000Z",
    "token":     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYwMTkyOTEzMywiZXhwIjoxNjAyNTMzOTMzfQ.cH1_wHg6d4OfhpayU4qDxTHfwwECYyxdaNVYRr9D7-4"
    }
#
##  Ver todos los usuarios  GET api/user/

### Headers
    Accept:application/json
    api_key:api_key
    Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.       eyJzdWIiOjEsImlhdCI6MTYwMTkyOTEzMywiZXhwIjoxNjAyNTMzOTMzfQ.       cH1_wHg6d4OfhpayU4qDxTHfwwECYyxdaNVYRr9D7-4

Esta peticion devuelve un JSON con todos los usuarios registrados.

    [
    {
        "id": 1,
        "firstName": "joaquin",
        "lastName":  "fenix",
        "username":  "joaquin",
        "createdAt": "2020-10-05T20:09:46.000Z",
        "updatedAt": "2020-10-05T20:09:46.000Z"
    }
    ]
#
## Actualizar usuario PUT api/user/$id

Se envia un JSON

    {
        "firstName": "theJoker",
        "lastName":  "Smile",
    }

Que retorna un JSON

    [
    {
        "id": 1,
        "firstName": "theJoker",
        "lastName":  "Smile",
        "username":  "joaquin",
        "createdAt": "2020-10-05T20:09:46.000Z",
        "updatedAt": "2020-10-05T20:09:46.000Z"
    }
    ]
