# Pigeon Example

## Introduction

This is an example API created with [Pigeon Framework](https://github.com/luisbazdev/pigeon-framework) that uses MySQL database.

The API has the following endpoints available:

* `GET /api/tasks` - Retrieve all Tasks
* `GET /api/tasks/:taskId` - Retrieve Task with id `taskId`
* `POST /api/tasks` - Creates a new Task with content of `text` field sent in request body
* `PUT /api/tasks/:taskId` - Updates content of Task with id `taskId` with `text` field sent in request body
* `DELETE /api/tasks/:taskId` - Deletes a Task with id `taskId`

The `task` handler uses Pigeon `JWTAuthentication` middleware (see [Pigeon docs](https://github.com/luisbazdev/pigeon-framework#authentication)) in all routes except the first two, which are public (do not need a JWT token to be sent from the client).

In order to be able to `create`, `update` and `delete` tasks, respectively, you must sign-up and then log-in to receive a valid JWT Token, which we will do using Pigeon `JWT Authentication routes`:

### Signing Up

Send a `POST` request to `/api/auth/signup-route` where `signup-route` is the value of `pigeon.auth.jwt.routes.signup` environment variable in `.env` file, which in this case is `/register`, so send a `POST` request to `/api/auth/register` with a request body that contains the following:

1. A valid `user` between 2 and 6 characters long, containing only alphanumeric characters. 
2. A valid `email` address.
3. A valid `password` with a minimum length of 8 characters, at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.

After that you should receive a `201 Created` response indicating that you successfully signed-up.

### Logging In

Send a `POST` request to `/api/auth/login-route` where `login-route` is the value of `pigeon.auth.jwt.routes.login` environment variable in `.env` file, which in this case is `/login`, so send a `POST` request to `/api/auth/login` with a request body that contains the `email` and `password` you provided in the previous step, if everything goes well you should receive a `JWT Token` in your response body:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVpcyBBbGVqYW5kcm8iLCJlbWFpbCI6Imx1aXMyQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiaWQiOjEsImlhdCI6MTY5MjM5NjIxNywiZXhwIjoxNjkyMzk5ODE3fQ.wZalR3MHi74wVRj88JUd0M-4nWjFSRMnTcOutoyby98"
}
```

Which you can then use to access the protected routes previously mentioned by sending the token in the `Authorization` header in the following way: 
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVpcyBBbGVqYW5kcm8iLCJlbWFpbCI6Imx1aXMyQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiaWQiOjEsI  mlhdCI6MTY5MjM5NjIxNywiZXhwIjoxNjkyMzk5ODE3fQ.wZalR3MHi74wVRj88JUd0M-4nWjFSRMnTcOutoyby98"
}
```

## How to run

1. Clone this repository `git clone https://github.com/luisbazdev/pigeon-example-api`
2. Run `npm install` followed by `npm run migrate`
3. (Optional) This API uses a MySQL database user `pigeon` with password `pigeon`, you can change it in `pigeon.db.mysql.url` variable in `.env` file!
4. Start your API by running `npm run start`
5. Try the API!
