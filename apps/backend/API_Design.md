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
  <summary>GET /user/me</summary>

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

</details>

<details>
  <summary>PATCH /user/me</summary>

**Sample Request**

```json
{
  "userName": "nafiss"
}
```

**Sample Response**

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

</details>

<details>
  <summary>DELETE /user/me</summary>

**Sample Request**

Requires JWT in `Authorization` header.

**Sample Response**

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

</details>

<details>
  <summary>GET /user/:id</summary>

**Sample Request**

`GET /user/688da86f5adf6531e6852cfc`

**Sample Response**

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
  <summary>POST /drivers/apply</summary>

```json
{
  "driverLocation": {
    "latitude": 23.8103,
    "longitude": 90.4125
  },
  "vehicleInfo": {
    "vehicleType": "Car",
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2020,
    "plateNumber": "DHK-5487"
  }
}
```

**Response**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Driver application submitted successfully",
  "data": {
    "userId": "688d9f33f868bd68bbb23f7b",
    "approvalStatus": "PENDING",
    "onlineStatus": "OFFLINE",
    "driverLocation": {
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "vehicleInfo": {
      "vehicleType": "Car",
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "plateNumber": "DHK-5487"
    },
    "_id": "688dad9b39d4876810a2d98e",
    "createdAt": "2025-08-02T06:18:03.519Z",
    "updatedAt": "2025-08-02T06:18:03.519Z"
  }
}
```

</details>

<details>
  <summary>GET /drivers/me</summary>

Requires JWT in `Authorization` header.

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Your driver profile retrieved successfully",
  "data": {
    "_id": "688dad9b39d4876810a2d98e",
    "userId": "688d9f33f868bd68bbb23f7b",
    "approvalStatus": "APPROVED",
    "onlineStatus": "ONLINE",
    "driverLocation": {
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "vehicleInfo": {
      "vehicleType": "Car",
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "plateNumber": "DHK-5487"
    },
    "createdAt": "2025-08-02T06:18:03.519Z",
    "updatedAt": "2025-08-02T06:46:06.205Z"
  }
}
```

</details>

<details>
  <summary>PATCH /drivers/me/status</summary>

```json
{
  "onlineStatus": "ONLINE"
}
```

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Driver status updated successfully",
  "data": {
    "_id": "688dad9b39d4876810a2d98e",
    "userId": "688d9f33f868bd68bbb23f7b",
    "approvalStatus": "APPROVED",
    "onlineStatus": "ONLINE",
    "driverLocation": {
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "vehicleInfo": {
      "vehicleType": "Car",
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "plateNumber": "DHK-5487"
    },
    "createdAt": "2025-08-02T06:18:03.519Z",
    "updatedAt": "2025-08-02T06:46:06.205Z"
  }
}
```

</details>
<details>
  <summary>GET /drivers/me/earnings</summary>

**Response**

```json
{
    "statusCode": 200,
    "success": true,
    "message": "Earning history retrieved successfully",
    "data": {
        "totalEarnings": 7342,
        "rides": [
            {
                "_id": "688db61e411e9aef67702f16",
                "rideStatus": "COMPLETED",
                "fareFinal": 7342,
                "createdAt": "2025-08-02T06:54:22.056Z"
            },
            ....
        ]
    }
}
```

</details>

---

### 🚕 **Ride APIs**

| Method | Endpoint              | Description                        |
| ------ | --------------------- | ---------------------------------- |
| GET    | `/rides/fare`         | Estimate fare of a ride            |
| POST   | `/rides/request`      | Rider requests a new ride          |
| POST   | `/rides/:id/cancel`   | Cancel ride before pickup          |
| PATCH  | `/rides/:id/accept`   | Driver accepts ride                |
| PATCH  | `/rides/:id/picked`   | Update ride status to PICKED_UP    |
| PATCH  | `/rides/:id/transit`  | Update ride status to IN_TRANSIT   |
| PATCH  | `/rides/:id/complete` | Update ride status to COMPLETED    |
| GET    | `/rides/me`           | List ride history for current user |
| GET    | `/rides/:id`          | Get ride details                   |

<details>
  <summary>GET /rides/fare</summary>

```
fare?pickupLat=50805231.177530855&pickupLng=50805231.177530855&destLat=50805231.177530855&destLng=50805231.177530855
```

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Fare estimated successfully",
  "data": {
    "fare": 100
  }
}
```

</details>

<details>
  <summary>POST /rides/request</summary>

**Sample Request**

Requires JWT in `Authorization` header.

```json
{
  "pickupLocation": {
    "latitude": 23.780573,
    "longitude": 93.279239
  },
  "destinationLocation": {
    "latitude": 23.768406,
    "longitude": 90.408918
  },
  "fareEstimated": 370,
  "fareFinal": 0.0,
  "timestamps": {
    "requested": "2025-07-31T14:15:00.000Z"
  }
}
```

**Sample Response**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Ride request created successfully",
  "data": {
    "riderId": "688d9ee7f868bd68bbb23f72",
    "driverId": null,
    "rideStatus": "REQUESTED",
    "pickupLocation": {
      "latitude": 23.780573,
      "longitude": 93.279239
    },
    "destinationLocation": {
      "latitude": 23.768406,
      "longitude": 90.408918
    },
    "transactionId": "txn_mdtwd6cg_0r2okxza",
    "fareEstimated": 370,
    "fareFinal": 0,
    "timestamps": {
      "requested": "2025-07-31T14:15:00.000Z"
    },
    "_id": "688db61e411e9aef67702f16",
    "createdAt": "2025-08-02T06:54:22.056Z",
    "updatedAt": "2025-08-02T06:54:22.056Z"
  }
}
```

</details>

<details>
  <summary>POST /rides/:id/cancel</summary>

**Request**

- Requires JWT in `Authorization` header.

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ride cancelled successfully",
  "data": {
    "_id": "688db61e411e9aef67702f16",
    "riderId": "688d9ee7f868bd68bbb23f72",
    "driverId": null,
    "rideStatus": "CANCELLED",
    "pickupLocation": {
      "latitude": 23.780573,
      "longitude": 93.279239
    },
    "destinationLocation": {
      "latitude": 23.768406,
      "longitude": 90.408918
    },
    "transactionId": "txn_mdtwd6cg_0r2okxza",
    "fareEstimated": 370,
    "fareFinal": 0,
    "timestamps": {
      "requested": "2025-07-31T14:15:00.000Z",
      "canceled": "2025-08-02T06:56:27.659Z"
    },
    "createdAt": "2025-08-02T06:54:22.056Z",
    "updatedAt": "2025-08-02T06:56:27.661Z"
  }
}
```

</details>
<details>
  <summary>PATCH /rides/:id/accept</summary>

- Requires JWT in `Authorization` header.
- Only available to drivers.

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ride accepted successfully",
  "data": {
    "_id": "688db61e411e9aef67702f16",
    "riderId": "688d9ee7f868bd68bbb23f72",
    "driverId": "688d9f33f868bd68bbb23f7b",
    "rideStatus": "ACCEPTED",
    "pickupLocation": {
      "latitude": 23.780573,
      "longitude": 93.279239
    },
    "destinationLocation": {
      "latitude": 23.768406,
      "longitude": 90.408918
    },
    "transactionId": "txn_mdtwd6cg_0r2okxza",
    "fareEstimated": 370,
    "fareFinal": 0,
    "timestamps": {
      "requested": "2025-07-31T14:15:00.000Z",
      "accepted": "2025-08-02T07:03:52.781Z",
      "canceled": "2025-08-02T06:56:27.659Z"
    },
    "createdAt": "2025-08-02T06:54:22.056Z",
    "updatedAt": "2025-08-02T07:03:52.782Z"
  }
}
```

</details>

<details>
  <summary>PATCH /rides/:id/picked</summary>

- Requires JWT in `Authorization` header.
- Only available to drivers.

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ride marked as picked up successfully",
  "data": {
    "_id": "688db61e411e9aef67702f16",
    "riderId": "688d9ee7f868bd68bbb23f72",
    "driverId": "688d9f33f868bd68bbb23f7b",
    "rideStatus": "PICKED_UP",
    "pickupLocation": {
      "latitude": 23.780573,
      "longitude": 93.279239
    },
    "destinationLocation": {
      "latitude": 23.768406,
      "longitude": 90.408918
    },
    "transactionId": "txn_mdtwd6cg_0r2okxza",
    "fareEstimated": 370,
    "fareFinal": 0,
    "timestamps": {
      "requested": "2025-07-31T14:15:00.000Z",
      "accepted": "2025-08-02T07:03:52.781Z",
      "started": "2025-08-02T07:05:41.660Z",
      "canceled": "2025-08-02T06:56:27.659Z"
    },
    "createdAt": "2025-08-02T06:54:22.056Z",
    "updatedAt": "2025-08-02T07:05:41.661Z"
  }
}
```

</details>

<details>
  <summary>PATCH /rides/:id/transit</summary>

- Requires JWT in `Authorization` header.
- Only available to drivers.

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ride marked as in transit successfully",
  "data": {
    "_id": "688db61e411e9aef67702f16",
    "riderId": "688d9ee7f868bd68bbb23f72",
    "driverId": "688d9f33f868bd68bbb23f7b",
    "rideStatus": "IN_TRANSIT",
    "pickupLocation": {
      "latitude": 23.780573,
      "longitude": 93.279239
    },
    "destinationLocation": {
      "latitude": 23.768406,
      "longitude": 90.408918
    },
    "transactionId": "txn_mdtwd6cg_0r2okxza",
    "fareEstimated": 370,
    "fareFinal": 0,
    "timestamps": {
      "requested": "2025-07-31T14:15:00.000Z",
      "accepted": "2025-08-02T07:03:52.781Z",
      "started": "2025-08-02T07:05:41.660Z",
      "canceled": "2025-08-02T06:56:27.659Z"
    },
    "createdAt": "2025-08-02T06:54:22.056Z",
    "updatedAt": "2025-08-02T07:11:29.842Z"
  }
}
```

</details>

<details>
  <summary>PATCH /rides/:id/complete</summary>

- Requires JWT in `Authorization` header.
- Only available to drivers.

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ride marked as completed successfully",
  "data": {
    "ride": {
      "_id": "688db61e411e9aef67702f16",
      "riderId": "688d9ee7f868bd68bbb23f72",
      "driverId": "688d9f33f868bd68bbb23f7b",
      "rideStatus": "COMPLETED",
      "pickupLocation": {
        "latitude": 23.780573,
        "longitude": 93.279239
      },
      "destinationLocation": {
        "latitude": 23.768406,
        "longitude": 90.408918
      },
      "transactionId": "txn_mdtwd6cg_0r2okxza",
      "fareEstimated": 370,
      "fareFinal": 7342,
      "timestamps": {
        "requested": "2025-07-31T14:15:00.000Z",
        "accepted": "2025-08-02T07:03:52.781Z",
        "started": "2025-08-02T07:05:41.660Z",
        "completed": "2025-08-02T07:27:53.909Z",
        "canceled": "2025-08-02T06:56:27.659Z"
      },
      "createdAt": "2025-08-02T06:54:22.056Z",
      "updatedAt": "2025-08-02T07:27:53.915Z"
    },
    "transaction": {
      "transactionId": "txn_mdtwd6cg_0r2okxza",
      "amount": 7342,
      "paymentStatus": "PENDING",
      "paymentGateway": "SSLCOMMERZ",
      "invoiceUrl": "",
      "_id": "688dbdf9450e72b38d77ae38",
      "createdAt": "2025-08-02T07:27:53.932Z",
      "updatedAt": "2025-08-02T07:27:53.932Z"
    }
  }
}
```

</details>

<details>
  <summary>GET /rides/me</summary>

**Sample Request**

Requires JWT in `Authorization` header.

**Sample Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ride history retrieved successfully",
  "data": [
    {
      "_id": "688db61e411e9aef67702f16",
      "riderId": "688d9ee7f868bd68bbb23f72",
      "driverId": "688d9f33f868bd68bbb23f7b",
      "rideStatus": "COMPLETED",
      "pickupLocation": {
        "latitude": 23.780573,
        "longitude": 93.279239
      },
      "destinationLocation": {
        "latitude": 23.768406,
        "longitude": 90.408918
      },
      "fareEstimated": 370,
      "fareFinal": 7342,
      "createdAt": "2025-08-02T06:54:22.056Z"
    },
    {
      "_id": "688db82f411e9aef67702f20",
      "riderId": "688d9ee7f868bd68bbb23f72",
      "driverId": null,
      "rideStatus": "CANCELLED",
      "pickupLocation": {
        "latitude": 23.780573,
        "longitude": 93.279239
      },
      "destinationLocation": {
        "latitude": 23.768406,
        "longitude": 90.408918
      },
      "fareEstimated": 250,
      "fareFinal": 0,
      "createdAt": "2025-08-02T07:03:11.340Z"
    }
  ]
}
```

</details>

<details>
  <summary>GET /rides/:id</summary>

**Sample Request**

`GET /rides/688db61e411e9aef67702f16`

Requires JWT in `Authorization` header.

**Sample Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ride details fetched successfully",
  "data": {
    "_id": "688db61e411e9aef67702f16",
    "riderId": "688d9ee7f868bd68bbb23f72",
    "driverId": null,
    "rideStatus": "REQUESTED",
    "pickupLocation": {
      "latitude": 23.780573,
      "longitude": 93.279239
    },
    "destinationLocation": {
      "latitude": 23.768406,
      "longitude": 90.408918
    },
    "transactionId": "txn_mdtwd6cg_0r2okxza",
    "fareEstimated": 370,
    "fareFinal": 0,
    "timestamps": {
      "requested": "2025-07-31T14:15:00.000Z",
      "canceled": "2025-08-02T06:56:27.659Z"
    },
    "createdAt": "2025-08-02T06:54:22.056Z",
    "updatedAt": "2025-08-02T06:56:27.661Z"
  }
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
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "688d9ee7f868bd68bbb23f72",
      "email": "rob@gamail.com",
      "userName": "rob",
      "password": "$purebcrypt$12$fcf35aeae6ce7673a5a9becebd64fba1$1ce8f7e7dc6bd8eaab402471dc744f30a5703f8ba3ba10bd66aef1c6fd96c92d",
      "role": "USER",
      "accountStatus": "active",
      "authProviders": [
        {
          "provider": "local",
          "providerId": "rob@gamail.com"
        }
      ],
      "createdAt": "2025-08-02T05:15:19.272Z",
      "updatedAt": "2025-08-02T05:15:19.272Z"
    },
    {
      "_id": "688d9f33f868bd68bbb23f7b",
      "email": "lucky@gamail.com",
      "userName": "lucky",
      "password": "$purebcrypt$12$dd4b581e9359f8cd65bd16ca57887624$980b6b4fc4d183a172f9332ae04e4b79321dde5ea63a693e007082d6a00e6d7b",
      "role": "DRIVER",
      "accountStatus": "active",
      "authProviders": [
        {
          "provider": "local",
          "providerId": "lucky@gamail.com"
        }
      ],
      "createdAt": "2025-08-02T05:16:35.805Z",
      "updatedAt": "2025-08-02T06:36:35.799Z"
    },
    ....
  ]
}
```

</details>

<details>
  <summary>GET /admin/drivers</summary>

**Sample Request**

```
GET /admin/drivers
```

**Sample Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Drivers fetched successfully",
  "data": [
    {
      "_id": "688dad9b39d4876810a2d98e",
      "userId": "688d9f33f868bd68bbb23f7b",
      "approvalStatus": "APPROVED",
      "onlineStatus": "OFFLINE",
      "driverLocation": {
        "latitude": 23.8103,
        "longitude": 90.4125
      },
      "vehicleInfo": {
        "vehicleType": "Car",
        "brand": "Toyota",
        "model": "Corolla",
        "year": 2020,
        "plateNumber": "DHK-5487"
      },
      "createdAt": "2025-08-02T06:18:03.519Z",
      "updatedAt": "2025-08-02T06:36:35.796Z"
    },
    ....
  ]
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

<details>
  <summary>PATCH /admin/drivers/:id/approve</summary>

**Sample Request**

`PATCH /admin/drivers/688dad9b39d4876810a2d98e/approve`

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Driver approved successfully",
  "data": {
    "_id": "688dad9b39d4876810a2d98e",
    "userId": "688d9f33f868bd68bbb23f7b",
    "approvalStatus": "APPROVED",
    "onlineStatus": "OFFLINE",
    "driverLocation": {
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "vehicleInfo": {
      "vehicleType": "Car",
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "plateNumber": "DHK-5487"
    },
    "createdAt": "2025-08-02T06:18:03.519Z",
    "updatedAt": "2025-08-02T06:33:12.765Z"
  }
}
```

</details>

<details>
  <summary>PATCH /admin/drivers/:id/reject</summary>

**Sample Request**

`PATCH /admin/drivers/688dad9b39d4876810a2d98e/reject`

**Response**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Driver rejected successfully",
  "data": {
    "_id": "688dad9b39d4876810a2d98e",
    "userId": "688d9f33f868bd68bbb23f7b",
    "approvalStatus": "REJECTED",
    "onlineStatus": "OFFLINE",
    "driverLocation": {
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "vehicleInfo": {
      "vehicleType": "Car",
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "plateNumber": "DHK-5487"
    },
    "createdAt": "2025-08-02T06:18:03.519Z",
    "updatedAt": "2025-08-02T06:35:53.476Z"
  }
}
```

</details>
