## API Design

### 🔐 **Authentication APIs**

| Method | Endpoint              | Description                  |
| ------ | --------------------- | ---------------------------- |
| POST   | `/auth/register`      | Register a new user          |
| POST   | `/auth/login`         | Login and receive JWT tokens |
| POST   | `/auth/refresh-token` | Refresh access token         |
| POST   | `/auth/logout`        | Invalidate token/logout      |

---

### 👤 **User APIs**

| Method | Endpoint    | Description                      |
| ------ | ----------- | -------------------------------- |
| GET    | `/user/me`  | Get current user info (self)     |
| PATCH  | `/user/me`  | Update profile info              |
| DELETE | `/user/me`  | Deactivate or delete own account |
| GET    | `/user/:id` | Get public profile of a user     |

---

### 🚗 **Driver APIs**

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| POST   | `/drivers/apply`       | Apply to become a driver          |
| GET    | `/drivers/me`          | Get driver profile                |
| PATCH  | `/drivers/me/status`   | Update online/availability status |
| GET    | `/drivers/me/earnings` | View earning history              |

---

### 🚕 **Ride APIs**

| Method | Endpoint              | Description                                    |
| ------ | --------------------- | ---------------------------------------------- |
| GET    | `/rides/fare`         | Estimate fare of a ride                        |
| GET    | `/rides/me`           | List ride history for current user             |
| POST   | `/rides/request`      | Rider requests a new ride                      |
| POST   | `/rides/:id/cancel`   | Cancel ride before pickup                      |
| GET    | `/rides/:id`          | Get ride details                               |
| PATCH  | `/rides/:id/accept`   | Driver accepts ride                            |
| PATCH  | `/rides/:id/picked`   | Update ride status to PICKED_UP (driver only)  |
| PATCH  | `/rides/:id/transit`  | Update ride status to IN_TRANSIT (driver only) |
| PATCH  | `/rides/:id/complete` | Update ride status to COMPLETED (driver only)  |

### 💰 **Transaction APIs**

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| PATCH  | `/transactions/pay` | Process ride payment |

---

### 💼 **Admin APIs**

| Method | Endpoint                     | Description                |
| ------ | ---------------------------- | -------------------------- |
| GET    | `/admin/users`               | List all users             |
| GET    | `/admin/drivers`             | List all drivers           |
| GET    | `/admin/rides`               | List all rides             |
| GET    | `/admin/users/:id`           | Get a single users data    |
| PATCH  | `/admin/users/:id/block`     | Block user account         |
| PATCH  | `/admin/users/:id/unblock`   | Unblock user account       |
| PATCH  | `/admin/drivers/:id/approve` | Approve driver application |
| PATCH  | `/admin/drivers/:id/reject`  | Reject driver application  |

---
