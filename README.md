# Ride Booking System

A modern, scalable ride-booking platform built with a TypeScript monorepo architecture using Turborepo. This system provides comprehensive functionality for riders, drivers, and administrators similar to popular ride-sharing services like Uber or Lyft.

## 🌟 Features

- **🔐 Role-based Authentication**: Secure JWT-based auth for riders, drivers, and admins
- **🚗 Ride Management**: Complete ride lifecycle from request to completion
- **💰 Transaction Processing**: Integrated payment and earnings system
- **🏗️ Scalable Architecture**: Modular monorepo structure with shared packages

## 🏗️ Architecture

This monorepo contains the following apps and packages:

### 📱 Applications

- **`backend`**: Express.js REST API with MongoDB integration
  - User authentication and authorization
  - Ride management system
  - Driver and rider functionality
  - Admin panel APIs
  - Transaction processing
- **`frontend`**: React + Vite application for the user interface
  - Modern Vite build system for fast development
  - Responsive design with TailwindCSS
  - Role-based UI components
  - Redux Toolkit for state management
  - Real-time updates

### 📦 Shared Packages

- **`@repo/db`**: Database utilities and MongoDB connector with Redis support
- **`@repo/utils`**: Common utilities including:
  - JWT token management
  - Password hashing
  - Email providers (Gmail, Resend)
  - OTP generation
  - Transaction ID generation
  - URL slug utilities
- **`@repo/math`**: Mathematical utilities for fare calculations and parsing
- **`@repo/ui`**: Shared React component library (using Radix UI and TailwindCSS)

### ⚙️ Configuration Packages

- **`@repo/eslint-config`**: ESLint configurations for Next.js and React
- **`@repo/prettier-config`**: Prettier formatting configurations
- **`@repo/typescript-config`**: TypeScript configurations for different project types

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) with strict type checking.

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommended package manager)
- **MongoDB** database

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd ride-booking-system
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Environment Setup:**

   ```bash
   # Copy environment files
   cp apps/backend/.env.example apps/backend/.env
   cp apps/frontend/.env.example apps/frontend/.env
   ```

4. **Configure Environment Variables:**

   **Backend (.env):**
   ```env
   # Server Configuration
   PORT=3000
   HOST=localhost
   NODE_ENV=development
   DB_URI="mongodb://127.0.0.1:27017/practice"
   
   # JWT Configuration
   JWT_ACCESS_SECRET="access"
   JWT_ACCESS_EXPIRES="15m"
   JWT_REFRESH_SECRET="refresh"
   JWT_REFRESH_EXPIRES="1d"
   
   # Hash Salt
   PASSWORD_HASH_SALT=12
   ```

   **Frontend (.env):**
   ```env
   VITE_BASE_URL="http://localhost:3001/api/v1"
   VITE_GEOCODING_API_KEY="your_geocoding_api_key_here"
   ```

### Development

```bash
# Run all applications in development mode
pnpm dev

# Run only the backend
pnpm backend

# Run specific app
pnpm dev --filter=frontend
pnpm dev --filter=backend
```

### Production Build

```bash
# Build all packages and apps
pnpm build

# Start production server
cd apps/backend && pnpm start
```

## 📚 API Documentation

The backend provides a comprehensive REST API with the following endpoints:

### 🔐 **Authentication APIs**

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| POST   | `/auth/register`        | Register a new user             |
| POST   | `/auth/login`           | Login and receive JWTs          |
| POST   | `/auth/refresh-token`   | Refresh access token            |
| POST   | `/auth/logout`          | Invalidate token/logout         |
| POST   | `/auth/forgot-password` | Request password reset email    |
| POST   | `/auth/reset-password`  | Reset password with token       |
| POST   | `/auth/change-password` | Change password (authenticated) |

### 🔑 **OTP APIs**

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| POST   | `/otp/send`   | Send OTP to email or SMS        |
| POST   | `/otp/verify` | Verify OTP provided by the user |

### 👤 **User APIs**

| Method | Endpoint    | Description                      |
| ------ | ----------- | -------------------------------- |
| GET    | `/user/me`  | Get current user info (self)     |
| PATCH  | `/user/me`  | Update profile info              |
| DELETE | `/user/me`  | Deactivate or delete own account |
| GET    | `/user/:id` | Get public profile of a user     |

### 🚗 **Driver APIs**

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| POST   | `/drivers/apply`       | Apply to become a driver          |
| GET    | `/drivers/me`          | Get driver profile                |
| PATCH  | `/drivers/me/status`   | Update online/availability status |
| GET    | `/drivers/me/earnings` | View earning history              |
| GET    | `/drivers/:id`         | Get Driver Details by Id          |

### 🚕 Ride Management

| Method | Endpoint                 | Description                                       |
| ------ | ------------------------ | ------------------------------------------------- |
| GET    | `/rides/fare`            | Estimate fare of a ride                           |
| POST   | `/rides/request`         | Rider requests a new ride                         |
| PATCH  | `/rides/:id/accept`      | Driver accepts ride                               |
| PATCH  | `/rides/:id/picked`      | Update ride status to PICKED_UP                   |
| PATCH  | `/rides/:id/transit`     | Update ride status to IN_TRANSIT                  |
| PATCH  | `/rides/:id/complete`    | Update ride status to COMPLETED                   |
| PATCH  | `/rides/:id/cancel`      | Cancel ride before pickup                         |
| GET    | `/rides/me`              | List ride history for current user                |
| GET    | `/rides/:id`             | Get ride details                                  |
| GET    | `/rides/requests/nearby` | Get all requested rides near the drivers location |
| GET    | `/rides/activeRides`     | Get all active ride of driver                     |

### 💰 Transactions

- `PATCH /api/v1/transactions/pay` - Process ride payment

### 👨‍💼 Admin Panel

- `GET /api/v1/admin/users` - List all users
- `GET /api/v1/admin/drivers` - List all drivers
- `GET /api/v1/admin/rides` - List all rides
- `PATCH /api/v1/admin/drivers/:id/approve` - Approve driver application
- `PATCH /api/v1/admin/users/:id/block` - Block user account

For detailed API documentation, see [API_Design.md](apps/backend/API_Design.md).

## 🏗️ Project Structure

```
ride-booking-system/
├── apps/
│   ├── backend/              # Express.js API server
│   │   ├── src/
│   │   │   ├── modules/      # Feature modules (auth, user, ride, etc.)
│   │   │   ├── middlewares/  # Express middlewares
│   │   │   ├── utils/        # Utility functions
│   │   │   ├── types/        # TypeScript type definitions
│   │   │   └── configs/      # Configuration files
│   │   └── dist/             # Compiled JavaScript
│   └── frontend/             # React + Vite application
│       ├── src/
│       ├── public/
│       └── dist/
├── packages/
│   ├── db/                   # Database utilities
│   ├── utils/                # Shared utilities
│   ├── math/                 # Mathematical functions
│   └── ui/                   # React components
├── configs/
│   ├── eslint-config/        # ESLint configurations
│   ├── prettier-config/      # Prettier configurations
│   └── typescript-config/    # TypeScript configurations
└── turbo.json                # Turborepo configuration
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## 🚀 Deployment

### Backend Deployment

The backend is configured for deployment on platforms like Vercel, Railway, or any Node.js hosting service.

```bash
# Build for production
pnpm build --filter=backend

# Start production server
cd apps/backend && pnpm start
```

### Frontend Deployment

The frontend can be deployed to Vercel, Netlify, Cloudflare Pages, or any static hosting service.

```bash
# Build for production
pnpm build --filter=frontend

# Preview production build locally
pnpm preview --filter=frontend

# Deploy to Cloudflare (if configured)
pnpm deploy --filter=frontend
```

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Run all apps in development
pnpm backend          # Run only backend
pnpm dev --filter=*   # Run specific app

# Building
pnpm build            # Build all packages and apps
pnpm build --filter=* # Build specific package

# Code Quality
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier
pnpm check-types      # Type check all packages

# Cleaning
pnpm clean            # Clean all build artifacts
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute this software in accordance with the terms of the MIT License.
