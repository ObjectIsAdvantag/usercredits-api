# credits




# What is does

https://www.getpostman.com/collections/2a9736c6b8f8f5a75407

- Create API account : mandatory to access the API (this is the only anonymous call)
-- authorization : none

- Create a UserCredit : restricted to an API account, with a unique secret code
-- authorization : api account (JWT)

- Decrement a UserCredit : restricted to an API account
-- authorization : api account (JWT)

- Read current credits : accessible from an API account
-- authorization : api account (JWT)

- Grow a UserCredit (future)

- Delete a UserCredit (no need)


## Example


# Technical aspects

## SailsJS

[Sails](http://sailsjs.org) application


## JWT authentication

Started from this example : https://thesabbir.com/how-to-use-json-web-token-authentication-with-sails-js/

Enhanced to ensure :
- a JWT token can be reissued
- only latest issued token is valid
- a valid token must have an API account associated to it


## Rate Limitation

https://github.com/jhurliman/node-rate-limiter


## TLS

enforced by the app

TLS is implemented by the hosting layer


# License


# Copyright


