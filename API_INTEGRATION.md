# API_INTEGRATION.md

# GearUp Frontend → Backend API Integration

This document maps the frontend pages, components, and server actions to the backend API endpoints used throughout the GearUp application.

---

# Authentication

| Frontend Feature | Backend Endpoint | Method |
|-----------------|-----------------|--------|
| Register User | `/api/auth/register` | POST |
| Login User | `/api/auth/login` | POST |
| Get Current User | `/api/auth/me` | GET |

Used in:
- Authentication pages
- Protected dashboard routes
- Role-based navigation

---

# Public Gear Marketplace

## Browse All Gear

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Gear Marketplace | `/api/gears` | GET |

Supports query parameters:

- search
- category
- price
- available
- sort
- page
- limit

Used in:

- `/gears`
- Gear listing
- Pagination
- Search
- Filtering
- Sorting

---

## Featured Gear (Homepage)

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Homepage Featured Gear | `/api/gears?featured=true` | GET |

Used in:

- Homepage Featured Equipment section

---

## Gear Details

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Gear Details Page | `/api/gears/:id` | GET |

Used in:

- Gallery
- Specifications
- Provider information
- Reviews
- Rental information

---

## Categories

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Category Filters | `/api/categories` | GET |

Used in:

- Marketplace filter sidebar
- Add Gear form
- Edit Gear form

---

# Rental Orders

## Create Rental Order

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Checkout Form | `/api/rentals` | POST |

Used in:

- Gear Details page
- Rental booking form

---

## Customer Orders

| Frontend | Endpoint | Method |
|----------|----------|--------|
| My Rentals | `/api/rentals` | GET |

Used in:

- Customer Dashboard
- Rental history

---

## Rental Details

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Rental Details | `/api/rentals/:id` | GET |

Used in:

- Rental details page
- Payment verification

---

# Payments

## Create Stripe Checkout Session

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Checkout | `/api/payments/create` | POST |

Used in:

- Rental booking
- Stripe Checkout redirection

---

## Payment Success

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Payment Success Page | `/api/payments/confirm` | POST |

Used in:

- Stripe success page
- Booking confirmation

---

## Payment History

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Payment History | `/api/payments` | GET |

Used in:

- Customer Dashboard

---

# Provider Dashboard

## My Gear

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Provider Gear Management | `/api/provider/gears` | GET |

---

## Add Gear

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Add Gear Form | `/api/provider/gear` | POST |

---

## Update Gear

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Edit Gear | `/api/provider/gear/:id` | PATCH |

---

## Delete Gear

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Delete Gear | `/api/provider/gear/:id` | DELETE |

---

## Provider Orders

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Incoming Orders | `/api/provider/orders` | GET |

---

## Update Order Status

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Provider Order Actions | `/api/provider/orders/:id` | PATCH |

Statuses handled by the frontend:

- Confirmed
- Picked Up
- Returned
- Cancelled

---

# Reviews

## Create Review

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Review Form | `/api/reviews` | POST |

Used after a completed rental.

---

# Admin Dashboard

## Users

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Manage Users | `/api/admin/users` | GET |
| Suspend / Activate User | `/api/admin/users/:id` | PATCH |

---

## Gear Management

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Manage Gear Listings | `/api/admin/gears` | GET |

---

## Rental Management

| Frontend | Endpoint | Method |
|----------|----------|--------|
| Manage Rentals | `/api/admin/rentals` | GET |

---

# Frontend Data Fetching Strategy

The application uses:

- **Next.js App Router**
- **Server Components** for initial page rendering
- **Server Actions** for authenticated operations
- **Fetch API** with Next.js cache tags and revalidation
- **Stripe Checkout** for secure payment processing

---

# Error Handling

All API integrations provide user-friendly feedback through:

- Toast notifications
- Loading skeletons
- Suspense fallbacks
- Error boundaries
- Validation messages
- Payment success/cancel pages

---

# Protected Routes

Middleware validation protect:

- Customer Dashboard
- Provider Dashboard
- Admin Dashboard
- Checkout flow
- Gear management
- Order management

Unauthorized users are redirected to the login page.