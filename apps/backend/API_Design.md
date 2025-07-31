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
| PATCH  | `/drivers/me/status`   | Update online/availability status |
| GET    | `/drivers/me`          | Get driver profile & status       |
| GET    | `/drivers/me/earnings` | View earning history              |
| GET    | `/drivers/me/rides`    | View ride history                 |

---

### 🚕 **Ride APIs**

| Method | Endpoint              | Description                                    |
| ------ | --------------------- | ---------------------------------------------- |
| POST   | `/rides/request`      | Rider requests a new ride                      |
| POST   | `/rides/:id/cancel`   | Cancel ride before pickup                      |
| GET    | `/rides/:id`          | Get ride details                               |
| GET    | `/rides/me`           | List ride history for current user             |
| PATCH  | `/rides/:id/accept`   | Driver accepts ride                            |
| PATCH  | `/rides/:id/picked`   | Update ride status to PICKED_UP (driver only)  |
| PATCH  | `/rides/:id/transit`  | Update ride status to IN_TRANSIT (driver only) |
| PATCH  | `/rides/:id/complete` | Update ride status to COMPLETED (driver only)  |

---

### 💰 **Transaction APIs**

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| GET    | `/transactions/:id` | Get transaction details           |
| GET    | `/transactions/me`  | List transactions (user-specific) |
| POST   | `/transactions/pay` | Process ride payment              |

---

### 💼 **Admin APIs**

| Method | Endpoint                     | Description                        |
| ------ | ---------------------------- | ---------------------------------- |
| GET    | `/admin/users`               | List all users                     |
| GET    | `/admin/users/:id`           | Get a single users data            |
| PATCH  | `/admin/users/:id/status`    | Change user account status         |
| GET    | `/admin/drivers`             | List all drivers                   |
| PATCH  | `/admin/drivers/:id/approve` | Approve/reject driver application  |
| GET    | `/admin/reports`             | Get flagged issues or ride reports |

---

### 📊 **Analytics & Reporting APIs** _(Admin Dashboard)_

| Method | Endpoint                    | Description                            |
| ------ | --------------------------- | -------------------------------------- |
| GET    | `/admin/analytics/overview` | Summary of usage and metrics           |
| GET    | `/admin/analytics/earnings` | View total earnings                    |
| GET    | `/admin/analytics/rides`    | Ride frequency, success/failure ratios |
