# StayNear

StayNear is a full-stack student accommodation platform designed to help students discover and connect with verified rental properties near their colleges. The platform provides separate experiences for **Seekers (Students), Property Owners, and Admins**, enabling seamless property discovery, listing management, inquiry handling, and secure authentication through a Role-Based Access Control (RBAC) system.

---

## Features

* Role-Based Access Control (Seeker, Owner, Admin)
* Secure Authentication & Authorization (JWT-based)
* Browse Verified Student Accommodations
* Advanced Property Search & Filtering
* Wishlist Management
* Property Inquiry System
* Property Image Uploads allowed
* Owner Property Management Dashboard
* Admin Dashboard for Platform Moderation
* Responsive User Interface
* Protected Routes & Middleware
* Toast Notifications & Loading States

---

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js
* Multer (Image Uploads)
* RBAC Middleware

### Database

* MongoDB Atlas (Cloud-hosted)
* Mongoose ODM

---

## RBAC Roles

### Seeker

* Register & Login
* Browse all verified properties
* View detailed property information
* Search and filter accommodations
* Save properties to wishlist
* Submit property inquiries
* Manage profile

### Owner

* Register & Login
* Access Owner Dashboard
* Add new property listings
* Upload property images
* Edit property details
* Delete property listings
* View and manage own properties
* View inquiries received for listed properties

### Admin

* Secure Admin Login
* Access Admin Dashboard
* View all registered users
* View all property listings
* Approve / Moderate platform content
* Delete inappropriate properties
* Manage users and owners
* Monitor inquiries
* Maintain overall platform data

---

## 📂 Project Structure

```text
StayNear/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint  | Description                    | Protected |
| ------ | --------- | ------------------------------ | --------- |
| POST   | /register | Register a new user            | ❌         |
| POST   | /login    | Authenticate user & return JWT | ❌         |
| GET    | /me       | Get logged-in user profile     | ✅         |

---

### Properties

| Method | Endpoint | Description          | Protected       |
| ------ | -------- | -------------------- | --------------- |
| GET    | /        | Get all properties   | ❌               |
| GET    | /:id     | Get property details | ❌               |
| POST   | /        | Add new property     | ✅ (Owner)       |
| PUT    | /:id     | Update property      | ✅ (Owner)       |
| DELETE | /:id     | Delete property      | ✅ (Owner/Admin) |

---

### Wishlist

| Method | Endpoint     | Description                   | Protected |
| ------ | ------------ | ----------------------------- | --------- |
| GET    | /            | Get user's wishlist           | ✅         |
| POST   | /:propertyId | Add property to wishlist      | ✅         |
| DELETE | /:propertyId | Remove property from wishlist | ✅         |

---

### Inquiry

| Method | Endpoint | Description    | Protected       |
| ------ | -------- | -------------- | --------------- |
| POST   | /        | Submit inquiry | ✅               |
| GET    | /        | View inquiries | ✅ (Owner/Admin) |

---

### Admin

| Method | Endpoint      | Description         | Protected |
| ------ | ------------- | ------------------- | --------- |
| GET    | /users        | View all users      | ✅ (Admin) |
| GET    | /properties   | View all properties | ✅ (Admin) |
| DELETE | /property/:id | Remove property     | ✅ (Admin) |
| GET    | /inquiries    | View all inquiries  | ✅ (Admin) |

---

## Owner Dashboard

The Owner Dashboard allows property owners to efficiently manage their rental listings.

* Add new rental properties
* Upload multiple property images
* Edit property details
* Delete property listings
* View listed properties
* Manage inquiries from students

---

## Admin Dashboard

The Admin Dashboard provides complete platform management.

* Monitor all users
* Manage property listings
* Remove inappropriate listings
* Monitor inquiries
* Maintain platform integrity

---

## Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected API Routes
* Role-Based Authorization (RBAC)
* Secure Environment Variables
* Image Upload Validation

---

## Future Enhancements

* Google Maps Integration
* Property Reviews & Ratings
* Online Booking System
* Real-time Chat
* Email Notifications
* Forgot Password
* Property Recommendation System
* Admin Analytics Dashboard

---

## Disclaimer

This project is intended for educational, development, and portfolio purposes only. Property listings and inquiries are simulated for demonstration and learning purposes.

---

## Made with ❤️ by Pratiti Paul

[GitHub](https://github.com/Pratiti-paul)
