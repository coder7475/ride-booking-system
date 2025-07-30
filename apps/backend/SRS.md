# Software Requirements Specification (SRS) for Ride Booking API

## 1. Introduction

### 1.1 Purpose

This document specifies the requirements for the Ride Booking API, a secure and scalable backend system for a ride booking service similar to Uber or Pathao. The API will manage user authentication, ride requests, ride fulfillment, and administrative oversight, serving riders, drivers, and admins with role-based functionality.

### 1.2 Scope

The Ride Booking API will provide RESTful endpoints to:

- Authenticate users and enforce role-based access control.
- Allow riders to request, cancel, and track rides.
- Enable drivers to accept, manage, and complete rides.
- Empower admins to oversee users, drivers, and ride operations.

The system will be implemented using Express.js and Mongoose, ensuring modularity and scalability.

---

## 2. Functional Requirements

### 2.1 Authentication

- The system shall implement a JWT-based login system.
- Users shall register with a username, password, and role (admin, rider, or driver).
- Passwords shall be securely hashed using bcrypt.
- Upon successful login, the system shall issue a JWT token containing the user’s role.

### 2.2 Rider Functionality

- Riders shall request a ride by specifying pickup and destination locations (stored as coordinates or addresses).
- Riders shall cancel a ride request before a driver accepts it.
- Riders shall view their ride history, including past and active rides.

### 2.3 Driver Functionality

- Drivers shall view a list of available ride requests.
- Drivers shall accept or reject ride requests.
- Drivers shall update the status of an accepted ride (e.g., Picked Up, In Transit, Completed).
- Drivers shall view their earnings history.
- Drivers shall set their availability status (Online or Offline).

### 2.4 Admin Functionality

- Admins shall view all users, drivers, and rides in the system.
- Admins shall approve or suspend drivers.
- Admins shall block or unblock user accounts.
- (Optional) Admins shall generate reports on system usage (e.g., ride statistics).

### 2.5 Ride Management

- All rides shall be stored in the database with complete history.
- Each ride shall follow a lifecycle with statuses: Requested, Accepted, Picked_Up, In_Transit, Completed.
- Only drivers shall update the status of their assigned rides.
- Role-based route protection shall restrict access to endpoints based on user roles.

---

## 3. Non-Functional Requirements

### 3.1 Security

- All API communications shall use HTTPS.
- Passwords shall be hashed and salted using bcrypt.
- JWT tokens shall expire after a defined period (e.g., 24 hours) and require renewal.

### 3.2 Scalability

- The system shall support a large number of concurrent users and ride requests.
- Database queries shall be optimized for performance.

### 3.3 Reliability

- The system shall maintain data integrity for all ride records.
- Error handling shall ensure graceful recovery from failures (e.g., invalid requests).

### 3.4 Usability

- API endpoints shall follow RESTful conventions for consistency.
- Error responses shall include clear messages and appropriate HTTP status codes (e.g., 400, 403, 404).

---

## 4. Business Rules and Validations

- Suspended drivers shall not accept ride requests.
- Drivers already on a ride shall not accept new requests until the current ride is completed.
- Riders shall not have multiple active ride requests simultaneously.
- Ride cancellation shall only be allowed before driver acceptance.

---

## 5. Optional Features for Future Consideration

The following features are **optional** and may be considered for future development to enhance the Ride Booking API:

- **Driver Ratings**
  - _Description_: Allow riders to rate drivers after completing a ride, providing feedback on the driver's performance.
- **Rider Feedback System**
  - _Description_: Enable drivers to provide feedback on riders, which could influence future ride assignments.
- **Fare Estimation Logic**
  - _Description_: Implement a system to estimate ride fares based on factors such as distance and time.
- **Admin Dashboard Analytics**
  - _Description_: Provide administrators with tools to view system usage patterns and performance metrics.

- **Geo-Based Driver Search**
  - _Description_: Enhance ride matching by using geographical data to find the nearest available drivers to a rider's location.

These features are not required for the initial implementation but can be added to improve the system's functionality and user experience.
