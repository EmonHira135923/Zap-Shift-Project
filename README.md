# ZapShift - Parcel Delivery & Courier Management Platform

ZapShift is a full-stack Next.js application designed to simplify parcel booking, courier management, rider assignment, payment processing, and delivery tracking for a modern logistics workflow. The project combines a customer-facing booking experience with an admin and rider dashboard to support end-to-end parcel operations.

## Project Overview

ZapShift was built to solve the challenge of managing parcel deliveries in a structured and transparent way. Instead of relying on scattered communication and manual tracking, the platform gives users a centralized system to:

- Book parcels online
- Track delivery progress
- Pay securely for deliveries
- Monitor courier operations
- Manage rider and admin workflows

The system is intended for customers, admins, and delivery riders who need a reliable digital workflow for logistics and delivery management.

## Problem Statement

Before this system, parcel handling often involves fragmented communication, delayed updates, and manual status tracking. Customers may not know where their parcel is, admins may struggle to assign riders efficiently, and riders may not have a clear way to process delivery actions.

ZapShift addresses these issues by providing:

- A centralized parcel booking flow
- Role-based access for users, admins, and riders
- Real-time delivery status updates through tracking logs
- Secure payment integration for parcel bookings
- A dashboard for business operations and delivery oversight

## Main Features

The following features are implemented in the current codebase:

- User registration and login
- Social login with Google and GitHub via NextAuth
- Credential-based authentication with JWT cookies
- Role-based access control for admin, rider, and user roles
- Parcel booking and cost calculation
- Parcel listing and parcel detail views
- Parcel deletion and update workflows
- Rider application and approval system
- Rider assignment to parcels
- Rider delivery actions such as accept, reject, pickup, and deliver
- Parcel tracking log generation
- Payment checkout using Stripe
- Payment success and cancellation handling
- Cloudinary-based profile image upload
- Invitation-based user registration flow
- Email notifications for invitations
- Location-based parcel form fields using Bangladesh state and district data
- Dashboard views for different user roles

## Technology Stack

### Frontend

- Next.js 16
- React 19
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Toastify
- React Icons
- Recharts
- Swiper
- React Leaflet

### Backend

- Next.js App Router Route Handlers
- Node.js
- JWT-based authentication
- NextAuth for social authentication
- Middleware-based authorization checks
- Axios for client-server API communication

### Database

- MongoDB Atlas
- MongoDB Node.js driver

### Authentication

- Custom JWT authentication via access and refresh cookies
- NextAuth for Google and GitHub login
- Role-based authorization using middleware and token payloads

### Tools & Services

- Stripe for payment processing
- Cloudinary for image uploads
- Nodemailer for email delivery
- MongoDB Atlas for data storage

## Project Architecture

The application follows a Next.js App Router architecture where frontend pages and backend API routes live together in the same project.

```text
src/
├── app/
│   ├── (Backend)/
│   │   ├── api/
│   │   ├── lib/
│   │   └── middlewares/
│   └── (Fronted)/
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
│   └── data/
└── proxy.js
```

### Folder Purpose

- app/(Fronted): public and authenticated UI pages
- app/(Backend)/api: REST-style API route handlers
- app/(Backend)/lib: database, email, tracking, cloudinary, and helper utilities
- app/(Backend)/middlewares: authentication and authorization middleware
- Componets: reusable UI components, forms, cards, and pages
- public/data: Bangladesh state/district and map data used by the UI

## User Roles & Permission System

The project uses three implemented roles:

### Admin

- Manages users, riders, and parcels
- Can view and manage all parcel records
- Can approve rider applications
- Can assign riders to deliveries
- Can access admin-only dashboard sections

### Rider

- Can receive assigned delivery tasks
- Can accept or reject a delivery request
- Can mark a parcel as picked up or delivered
- Can access rider-specific dashboard functionality

### User

- Can register and log in
- Can book parcels
- Can view their own parcel history
- Can manage their profile
- Can make payments for parcel bookings
- Can view tracking information for their parcels

## Authentication & Authorization Flow

The authentication flow is built around a hybrid approach:

1. User logs in with credentials or social providers
2. The server validates credentials or social authentication
3. A JWT access token is issued and stored in cookies
4. The application uses the token to identify the user across requests
5. Middleware checks the user role before granting access to protected routes

### Flow

```text
Login / Social Sign-In
↓
Token Verification
↓
Role Checking
↓
Protected Route Validation
↓
Access Granted / Denied
```

## Application Workflow

A typical parcel lifecycle in the platform looks like this:

```text
User books a parcel
→ Parcel data is submitted to the API
→ Parcel is stored in MongoDB
→ Payment checkout is initiated for unpaid parcels
→ Payment success updates the parcel status
→ Rider can accept and process the delivery
→ Tracking logs are generated
→ User can view the track history and delivery state
```

## API Documentation

The following API endpoints are implemented in the project:

### Authentication

- POST /api/auth/register
  - Registers a new user or completes invitation-based registration
- POST /api/auth/login
  - Authenticates a user and creates JWT cookies
- POST /api/auth/logout
  - Clears authentication cookies
- GET /api/auth/myprofile
  - Returns the authenticated user profile
- PATCH /api/auth/myprofile/[id]
  - Updates user profile data and image
- POST /api/auth/invite
  - Sends an invitation email to a new user

### Parcels

- GET /api/parcels
  - Fetches parcels with optional search and filter parameters
- POST /api/parcels
  - Creates a new parcel booking
- GET /api/parcels/[id]
  - Retrieves a single parcel
- PATCH /api/parcels/[id]
  - Assigns a rider to a parcel
- DELETE /api/parcels/[id]
  - Deletes a parcel
- PATCH /api/parcels/[id]/status
  - Handles rider actions such as accept, reject, pickup, and deliver

### Riders

- GET /api/riders
  - Lists rider records with filtering and pagination
- POST /api/riders
  - Submits a rider application
- PATCH /api/riders/[id]
  - Updates rider status and promotes the user to rider role when accepted
- DELETE /api/riders/[id]
  - Removes a rider record

### Payments & Tracking

- POST /api/checkout
  - Creates a Stripe checkout session
- PATCH /api/payment-success
  - Confirms payment and updates parcel/payment records
- GET /api/payment-success
  - Lists payment history for the authenticated user
- GET /api/trackings/[trackingId]/logs
  - Returns tracking history for a parcel

## Database Structure

The project uses MongoDB with the following collections:

### users

- Stores user account information
- Includes role, email, password hash, phone, image, provider, and timestamps

### Parcels

- Stores parcel details including sender, receiver, parcel type, weight, cost, payment status, delivery status, and assignment data

### Payments

- Stores payment transaction records, amount, transaction ID, customer information, and payment status

### Riders

- Stores rider applications and rider operational status such as availability and approval state

### Trackings

- Stores parcel tracking logs created during progress updates

## Environment Variables

The following environment variables are expected by the project:

```env
NEXTAUTH_SECRET=
NEXTAUTH_REFRESH_SECRET=
DB_USER=
DB_PASS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
STRIPE_SECRET_KEY=
NEXT_AUTH_URL=
EMAIL_USER=
EMAIL_PASS=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

If any of these are not configured, the related services will not function properly.

## Installation & Setup Guide

### Prerequisites

- Node.js (latest LTS version recommended)
- MongoDB Atlas account
- Stripe account
- Cloudinary account
- Google and GitHub developer credentials for social login

### Steps

```bash
git clone <repository-url>
cd zap-shift-project
npm install
npm run dev
```

### Setup Instructions

1. Create a MongoDB Atlas cluster and configure the database connection variables.
2. Set up Stripe and add the secret key to the environment variables.
3. Configure Google and GitHub OAuth credentials.
4. Configure Cloudinary credentials for profile image uploads.
5. Set up Gmail credentials for invitation emails.
6. Start the development server with npm run dev.

## Demo Credentials

Use the following demo accounts to sign in from the login page:

### Admin
- Email: admin@gmail.com
- Password: admin1234

### Rider
- Email: rider@gmail.com
- Password: rider1234


## Deployment Guide

To deploy the application in production:

1. Build the project with:

```bash
npm run build
```

2. Set all required environment variables in the hosting platform.
3. Deploy the project to a platform such as Vercel, Netlify, or a custom Node.js host.
4. Make sure the MongoDB connection, Stripe webhooks, and Cloudinary credentials are available in the production environment.
5. Configure the production base URL in NEXT_AUTH_URL.

## Future Improvements

Possible improvements for the next iteration include:

- Real-time delivery notifications
- Admin analytics and reporting dashboards
- Advanced search and filtering for parcels and payments
- Enhanced tracking map integration
- Mobile app support
- Automated SMS notifications
- Better audit logs for operations

## Challenges & Solutions

Some of the main technical challenges in this project were:

- Managing multiple roles in one application without compromising security
- Implementing secure route protections through middleware and token validation
- Handling parcel lifecycle updates across parcels, payments, and tracking logs
- Integrating Stripe payment confirmation with parcel status updates
- Supporting image uploads and profile management through Cloudinary

These challenges were addressed through middleware-based access control, route-level validation, centralized database helpers, and structured tracking logic.

## Author

Name: Your Name

GitHub: your-github

LinkedIn: your-linkedin

## License

This project is licensed under the MIT License.
