## API Design

### 🔐 **Authentication APIs**

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | `/auth/register`      | Register a new user     |
| POST   | `/auth/login`         | Login and receive JWTs  |
| POST   | `/auth/refresh-token` | Refresh access token    |
| POST   | `/auth/logout`        | Invalidate token/logout |

<details>
  <summary>POST /auth/register</summary>

**Sample Request**

```json
{
  "userName": "nafis",
  "email": "nafis@gmail.com",
  "password": "12x3tingTong!"
}
```

**Sample Response**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "User registered successfully",
  "data": {
    "email": "nafis@gmail.com",
    "userName": "nafis",
    "role": "USER",
    "accountStatus": "active",
    "_id": "688da86f5adf6531e6852cfc",
    "createdAt": "2025-08-02T05:55:59.475Z"
  }
}
```

</details>

<details>
  <summary>POST /auth/login</summary>

**Sample Request**

```json
{
  "email": "nafis@gmail.com",
  "password": "12x3tingTong!"
}
```

**Sample Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "User login successful",
  "data": {
    "accessToken": "access.token.value",
    "refreshToken": "refresh.token.value"
  }
}
```

</details>

<details>
  <summary>POST /auth/refresh-token</summary>

**Sample Request**

**Headers**
Authorization: Bearer <your-refresh-token>

**Sample Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Access token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGQ5ZWU3Zjg2OGJkNjhiYmIyM2Y3MiIsImVtYWlsIjoicm9iQGdhbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1NDExNDYxNCwiZXhwIjoxODQwNTE0NjE0fQ.KLb5NqbkotZjVFMytB3LofvDXs4ws0bf0say6ElsVoY",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGQ5ZWU3Zjg2OGJkNjhiYmIyM2Y3MiIsImVtYWlsIjoicm9iQGdhbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1NDExMjMxNiwiZXhwIjoyMzU4OTEyMzE2fQ.-TXtydu_qzDWX_faxHUtSZtiw97t7wUu3xg0GJjDAUM"
  }
}
```

</details>

<details>
  <summary>POST /auth/logout</summary>

**Sample Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

</details>

---

### 👤 **User APIs**

| Method | Endpoint    | Description                      |
| ------ | ----------- | -------------------------------- |
| GET    | `/user/me`  | Get current user info (self)     |
| PATCH  | `/user/me`  | Update profile info              |
| DELETE | `/user/me`  | Deactivate or delete own account |
| GET    | `/user/:id` | Get public profile of a user     |

<details>
  <summary>Sample Request & Response</summary>

**GET /user/me**
Requires JWT in `Authorization` header.

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Your profile retrieved successfully",
  "data": {
    "_id": "688da86f5adf6531e6852cfc",
    "email": "nafis@gamail.com",
    "userName": "nafis",
    "role": "USER",
    "accountStatus": "active",
    "authProviders": [
      {
        "provider": "local",
        "providerId": "nafis@gamail.com"
      }
    ],
    "createdAt": "2025-08-02T05:55:59.475Z",
    "updatedAt": "2025-08-02T05:55:59.475Z"
  }
}
```

**PATCH /user/me**

**Request**

```json
{
  "userName": "nafiss"
}
```

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "User data updated successfully",
  "data": {
    "_id": "688da86f5adf6531e6852cfc",
    "email": "nafis@gamail.com",
    "userName": "nafiss",
    "role": "USER",
    "accountStatus": "active",
    "authProviders": [
      {
        "provider": "local",
        "providerId": "nafis@gamail.com"
      }
    ],
    "createdAt": "2025-08-02T05:55:59.475Z",
    "updatedAt": "2025-08-02T06:09:28.252Z"
  }
}
```

**DELETE /user/me**

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "User deleted (deactivated) successfully",
  "data": {
    "_id": "688da86f5adf6531e6852cfc",
    "email": "nafis@gamail.com",
    "userName": "nafiss",
    "role": "USER",
    "accountStatus": "deactivated",
    "authProviders": [
      {
        "provider": "local",
        "providerId": "nafis@gamail.com"
      }
    ],
    "createdAt": "2025-08-02T05:55:59.475Z",
    "updatedAt": "2025-08-02T06:12:26.142Z"
  }
}
```

**GET /user/\:id**
**Request**

`/user/688da86f5adf6531e6852cfc`

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Public Profile retrieved successfully",
  "data": {
    "name": "nafiss",
    "email": "nafis@gamail.com"
  }
}
```

</details>

---

### 🚗 **Driver APIs**

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| POST   | `/drivers/apply`       | Apply to become a driver          |
| GET    | `/drivers/me`          | Get driver profile                |
| PATCH  | `/drivers/me/status`   | Update online/availability status |
| GET    | `/drivers/me/earnings` | View earning history              |

<details>
  <summary>Sample Request & Response</summary>

**POST /drivers/apply**

```json
{
  "licenseNumber": "ABC123456",
  "vehicleInfo": {
    "make": "Toyota",
    "model": "Prius"
  }
}
```

**Response**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Driver application submitted",
  "data": { ... }
}
```

**PATCH /drivers/me/status**

```json
{
  "online": true
}
```

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Status updated"
}
```

**GET /drivers/me/earnings**

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "data": [
    { "date": "2025-08-01", "amount": 50 },
    { "date": "2025-08-02", "amount": 75 }
  ]
}
```

</details>

---

### 🚕 **Ride APIs**

| Method | Endpoint              | Description                        |
| ------ | --------------------- | ---------------------------------- |
| GET    | `/rides/fare`         | Estimate fare of a ride            |
| POST   | `/rides/request`      | Rider requests a new ride          |
| PATCH  | `/rides/:id/accept`   | Driver accepts ride                |
| PATCH  | `/rides/:id/picked`   | Update ride status to PICKED_UP    |
| PATCH  | `/rides/:id/transit`  | Update ride status to IN_TRANSIT   |
| PATCH  | `/rides/:id/complete` | Update ride status to COMPLETED    |
| POST   | `/rides/:id/cancel`   | Cancel ride before pickup          |
| GET    | `/rides/me`           | List ride history for current user |
| GET    | `/rides/:id`          | Get ride details                   |

<details>
  <summary>Sample Request & Response</summary>

**GET /rides/fare**

```
?pickup=23.7,90.4&dropoff=23.8,90.5
```

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "estimatedFare": 120.5
  }
}
```

**POST /rides/request**

```json
{
  "pickup": { "lat": 23.7, "lng": 90.4 },
  "dropoff": { "lat": 23.8, "lng": 90.5 }
}
```

**Response**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Ride requested",
  "data": { ... }
}
```

**PATCH /rides/\:id/complete**

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ride marked as completed"
}
```

</details>

---

### 💰 **Transaction APIs**

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| PATCH  | `/transactions/pay` | Process ride payment |

<details>
  <summary>PATCH /transactions/pay</summary>

**Request**

```json
{
  "rideId": "abc123",
  "paymentMethod": "card"
}
```

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Payment successful",
  "data": {
    "transactionId": "txn_xyz123"
  }
}
```

</details>

---

### 💼 **Admin APIs**

| Method | Endpoint                     | Description                |
| ------ | ---------------------------- | -------------------------- |
| GET    | `/admin/users`               | List all users             |
| GET    | `/admin/drivers`             | List all drivers           |
| GET    | `/admin/rides`               | List all rides             |
| GET    | `/admin/users/:id`           | Get a single user's data   |
| PATCH  | `/admin/users/:id/block`     | Block user account         |
| PATCH  | `/admin/users/:id/unblock`   | Unblock user account       |
| PATCH  | `/admin/drivers/:id/approve` | Approve driver application |
| PATCH  | `/admin/drivers/:id/reject`  | Reject driver application  |

<details>
  <summary>GET /admin/users</summary>

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "data": [{ "userName": "nafis", "email": "nafis@gmail.com", "role": "USER" }]
}
```

</details>

<details>
  <summary>PATCH /admin/users/:id/block</summary>

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "User blocked"
}
```

</details>
