# StayNear

StayNear is a full-stack student accommodation platform designed to help students discover and connect with verified rental properties near their colleges. The platform provides separate experiences for students (seekers) and property owners, enabling seamless property discovery, listing management, wishlists, inquiries, and secure authentication through a role-based access control (RBAC) system.

---

## Features

* Role-Based Access Control (Seeker, Owner, Admin)
* Secure Authentication & Authorization (JWT-based)
* Browse Verified Student Accommodations
* Advanced Property Search & Filtering
* Wishlist Management
* Property Inquiry System
* Property Image Uploads
* Owner Property Management Dashboard
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
* View property details
* Search and filter accommodations
* Save properties to wishlist
* Submit property inquiries
* Manage profile

### Owner

* Register & Login
* Access owner dashboard
* Add new property listings
* Upload property images
* Edit property details
* Delete property listings
* Manage listed properties

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

| Method | Endpoint | Description          | Protected |
| ------ | -------- | -------------------- | --------- |
| GET    | /        | Get all properties   | ❌         |
| GET    | /:id     | Get property details | ❌         |
| POST   | /        | Add new property     | ✅ (Owner) |
| PUT    | /:id     | Update property      | ✅ (Owner) |
| DELETE | /:id     | Delete property      | ✅ (Owner) |

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

## Property Management

Owners can efficiently manage their rental listings through a dedicated dashboard.

* Add new rental properties
* Upload multiple property images
* Update property information
* Remove outdated listings
* View all listed properties
* Manage inquiries from interested students

---

## Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected API Routes
* Role-Based Authorization
* Secure Environment Variables
* Image Upload Validation

---

## Future Enhancements

* Google Maps Integration
* Property Reviews & Ratings
* Online Booking System
* Real-time Chat between Students & Owners
* Email Notifications
* Forgot Password Functionality
* Property Recommendation System
* Admin Dashboard & Analytics

---

## Disclaimer

This project is intended for educational, development, and portfolio purposes only. Property listings and inquiries are simulated for demonstration and learning purposes.

---

## Made with ❤️ by Pratiti Paul

[GitHub](https://github.com/Pratiti-paul)
