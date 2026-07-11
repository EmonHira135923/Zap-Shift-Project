<div align="center">

# 📦 ZapShift

**Parcel Delivery & Courier Management Platform**

A full-stack Next.js application for booking, tracking, and managing parcel deliveries — with dedicated workflows for customers, riders, and admins.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

[Live Demo](https://zap-shift-project-sooty.vercel.app/) · [Repository](https://github.com/EmonHira135923/Zap-Shift-Project) · [Report an Issue](https://github.com/EmonHira135923/Zap-Shift-Project/issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [User Roles & Permissions](#user-roles--permissions)
- [Authentication Flow](#authentication-flow)
- [Application Workflow](#application-workflow)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Demo Credentials](#demo-credentials)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Challenges & Solutions](#challenges--solutions)
- [Author](#author)
- [License](#license)

---

## Overview

ZapShift centralizes parcel logistics into a single digital workflow. Rather than relying on scattered communication and manual status updates, it gives customers, riders, and admins one shared system to:

- 📮 Book parcels online
- 🚚 Track delivery progress in real time
- 💳 Pay securely for deliveries
- 🧭 Monitor courier operations
- 🗂️ Manage rider and admin workflows

## Problem Statement

Traditional parcel handling often suffers from fragmented communication, delayed status updates, and inefficient rider assignment — leaving customers in the dark and admins without a clear operational view.

ZapShift solves this with:

- A centralized parcel booking flow
- Role-based access for users, admins, and riders
- Real-time delivery status via tracking logs
- Secure, integrated payment processing
- A unified dashboard for business and delivery oversight

## Features

<table>
<tr><td width="50%" valign="top">

**Accounts & Access**
- Email/password registration & login
- Google and GitHub social login (NextAuth)
- JWT-based credential authentication
- Role-based access control (Admin / Rider / User)
- Invitation-based registration with email notifications

**Parcels**
- Parcel booking with automatic cost calculation
- Parcel listing, filtering & detail views
- Parcel update and deletion workflows
- Location-based form fields (Bangladesh states/districts)

</td><td width="50%" valign="top">

**Riders**
- Rider application & admin approval
- Rider-to-parcel assignment
- Accept / reject / pickup / deliver actions
- Rider-specific dashboard

**Payments & Tracking**
- Stripe checkout integration
- Payment success/cancellation handling
- Automatic tracking log generation
- Cloudinary-based profile image upload
- Role-specific dashboards

</td></tr>
</table>

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 · React 19 · Tailwind CSS · Framer Motion · React Hook Form · React Toastify · React Icons · Recharts · Swiper · React Leaflet |
| **Backend** | Next.js App Router Route Handlers · Node.js · JWT Auth · NextAuth · Middleware Authorization · Axios |
| **Database** | MongoDB Atlas (Node.js driver) |
| **Auth** | Custom JWT (access/refresh cookies) · NextAuth (Google, GitHub) · Role-based middleware |
| **Services** | Stripe (payments) · Cloudinary (images) · Nodemailer (email) |

## Architecture

The app uses a Next.js App Router structure, colocating frontend pages and backend API routes in one project.

```text
src/
├── app/
│   ├── (Backend)/
│   │   ├── api/            # REST-style API route handlers
│   │   ├── lib/             # DB, email, tracking, Cloudinary helpers
│   │   └── middlewares/     # Auth & authorization middleware
│   └── (Fronted)/           # Public and authenticated UI pages
├── Componets/
│   ├── buttons/
│   ├── cards/
│   ├── forms/
│   ├── Map/
│   ├── Pages/
│   ├── Provider/
│   ├── Shared/
│   ├── Skeltons/
│   └── utils/
├── public/
│   └── data/                # Bangladesh state/district & map data
└── proxy.js
```

## User Roles & Permissions

| Capability | Admin | Rider | User |
|---|:---:|:---:|:---:|
| Register & log in | ✅ | ✅ | ✅ |
| Book parcels | – | – | ✅ |
| View own parcel history | – | – | ✅ |
| Make payments | – | – | ✅ |
| View own tracking info | – | – | ✅ |
| Accept / reject deliveries | – | ✅ | – |
| Mark parcel picked up / delivered | – | ✅ | – |
| View/manage all parcels | ✅ | – | – |
| Approve rider applications | ✅ | – | – |
| Assign riders to deliveries | ✅ | – | – |
| Access admin dashboard | ✅ | – | – |

## Authentication Flow

ZapShift uses a hybrid authentication approach combining credential-based JWT auth with social sign-in:

```text
Login / Social Sign-In
        │
        ▼
  Token Verification
        │
        ▼
    Role Checking
        │
        ▼
Protected Route Validation
        │
        ▼
  Access Granted / Denied
```

1. User logs in with credentials or a social provider.
2. The server validates credentials or social authentication.
3. A JWT access token is issued and stored in cookies.
4. The app uses the token to identify the user on subsequent requests.
5. Middleware checks the user's role before granting access to protected routes.

## Application Workflow

```text
User books a parcel
   → Parcel data submitted to the API
   → Parcel stored in MongoDB
   → Payment checkout initiated for unpaid parcels
   → Payment success updates the parcel status
   → Rider accepts and processes the delivery
   → Tracking logs are generated
   → User views tracking history and delivery state
```

## API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user, or complete invitation-based registration |
| `POST` | `/api/auth/login` | Authenticate a user and issue JWT cookies |
| `POST` | `/api/auth/logout` | Clear authentication cookies |
| `GET` | `/api/auth/myprofile` | Get the authenticated user's profile |
| `PATCH` | `/api/auth/myprofile/[id]` | Update profile data / image |
| `POST` | `/api/auth/invite` | Send an invitation email to a new user |

### Parcels

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/parcels` | Fetch parcels (search & filter supported) |
| `POST` | `/api/parcels` | Create a new parcel booking |
| `GET` | `/api/parcels/[id]` | Retrieve a single parcel |
| `PATCH` | `/api/parcels/[id]` | Assign a rider to a parcel |
| `DELETE` | `/api/parcels/[id]` | Delete a parcel |
| `PATCH` | `/api/parcels/[id]/status` | Rider actions: accept, reject, pickup, deliver |

### Riders

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/riders` | List riders (filtering & pagination) |
| `POST` | `/api/riders` | Submit a rider application |
| `PATCH` | `/api/riders/[id]` | Update rider status; promotes user to rider role on approval |
| `DELETE` | `/api/riders/[id]` | Remove a rider record |

### Payments & Tracking

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/checkout` | Create a Stripe checkout session |
| `PATCH` | `/api/payment-success` | Confirm payment; update parcel/payment records |
| `GET` | `/api/payment-success` | List payment history for the authenticated user |
| `GET` | `/api/trackings/[trackingId]/logs` | Get tracking history for a parcel |

## Database Schema

MongoDB collections used by the application:

| Collection | Purpose |
|---|---|
| **users** | Account info — role, email, password hash, phone, image, provider, timestamps |
| **Parcels** | Sender/receiver info, parcel type, weight, cost, payment status, delivery status, assignment data |
| **Payments** | Transaction records — amount, transaction ID, customer info, payment status |
| **Riders** | Rider applications and operational status (availability, approval state) |
| **Trackings** | Parcel tracking logs generated during status updates |

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- MongoDB Atlas account
- Stripe account
- Cloudinary account
- Google & GitHub OAuth developer credentials

### Installation

```bash
git clone https://github.com/EmonHira135923/Zap-Shift-Project.git
cd zap-shift-project
npm install
npm run dev
```

### Setup Checklist

1. Create a MongoDB Atlas cluster and add the connection variables below.
2. Set up Stripe and add your secret key.
3. Configure Google and GitHub OAuth credentials.
4. Configure Cloudinary credentials for profile image uploads.
5. Set up Gmail credentials for invitation emails.
6. Run `npm run dev` to start the development server.

## Environment Variables

Create a `.env` file in the project root with the following:

```env
# Auth
NEXTAUTH_SECRET=
NEXTAUTH_REFRESH_SECRET=
NEXT_AUTH_URL=

# Database
DB_USER=
DB_PASS=

# Social Login
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=

# Payments
STRIPE_SECRET_KEY=

# Email (invitations)
EMAIL_USER=
EMAIL_PASS=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

> ⚠️ If any of these are missing, the related service (auth, payments, email, or image upload) will not function correctly.

## Demo Credentials

Try the platform using these accounts from the login page:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@gmail.com` | `admin1234` |
| **Rider** | `rider@gmail.com` | `rider1234` |

## Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Set all required environment variables on your hosting platform.
3. Deploy to Vercel, Netlify, or a custom Node.js host.
4. Ensure MongoDB connection, Stripe webhooks, and Cloudinary credentials are available in production.
5. Set the production base URL in `NEXT_AUTH_URL`.

## Roadmap

- [ ] Real-time delivery notifications
- [ ] Admin analytics and reporting dashboards
- [ ] Advanced search and filtering for parcels and payments
- [ ] Enhanced tracking map integration
- [ ] Mobile app support
- [ ] Automated SMS notifications
- [ ] Improved audit logs for operations

## Challenges & Solutions

| Challenge | Solution |
|---|---|
| Managing multiple roles securely in one app | Middleware-based access control with role checks on every protected route |
| Protecting routes from unauthorized access | Token validation combined with route-level middleware |
| Coordinating updates across parcels, payments & tracking | Centralized database helpers and structured tracking logic |
| Syncing Stripe payment confirmation with parcel status | Dedicated payment-success handler that updates parcel state atomically |
| Handling image uploads and profile management | Cloudinary integration for reliable, scalable image storage |

## Author

**Emon Hossain Hira**

- GitHub: [@EmonHira135923](https://github.com/EmonHira135923)
- Repository: [Zap-Shift-Project](https://github.com/EmonHira135923/Zap-Shift-Project)
- Live Demo: [zap-shift-project-sooty.vercel.app](https://zap-shift-project-sooty.vercel.app/)

## License

This project is licensed under the [MIT License](LICENSE).