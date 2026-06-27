# 🏡 StayNear

StayNear is a full-stack accommodation booking platform designed specifically for students looking for verified rental properties near their colleges. The platform enables students to browse accommodations, save favorites, submit inquiries, and connect with property owners, while property owners can list and manage their rental properties through a dedicated dashboard.

---

## 🚀 Features

### 👨‍🎓 Student (Seeker)

* User Registration & Login using JWT Authentication
* Browse verified rental properties
* Search and filter accommodations
* View detailed property information
* Add and remove properties from Wishlist
* Submit property inquiries
* Responsive and user-friendly interface

### 🏠 Property Owner

* Secure authentication
* Add new property listings
* Upload property images
* Edit and delete listed properties
* View and manage their own listings

### 🔐 Authentication & Security

* JWT-based Authentication
* Password hashing using bcrypt
* Role-Based Access Control (Seeker & Owner)
* Protected API Routes
* Environment variable configuration for sensitive credentials

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📂 Project Structure

```
StayNear
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5002

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

JWT_EXPIRE=7d
```

Create a `.env` file inside the **client** directory.

```env
VITE_API_URL=http://localhost:5002/api
```

For production:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

---

## 📦 Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/StayNear.git
```

```bash
cd StayNear
```

---

### Install Frontend

```bash
cd client
npm install
npm run dev
```

---

### Install Backend

```bash
cd server
npm install
npm run dev
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | Register User      |
| POST   | `/api/auth/login`    | Login User         |
| GET    | `/api/auth/me`       | Get Logged-in User |

### Properties

* Get All Properties
* Get Single Property
* Add Property
* Update Property
* Delete Property

### Wishlist

* Add to Wishlist
* Remove from Wishlist
* Get Wishlist

### Inquiry

* Submit Inquiry
* Get All Inquiries

---

## 📸 Screenshots

Add screenshots of:

* Home Page
* Login Page
* Registration Page
* Property Listing
* Property Details
* Wishlist
* Owner Dashboard
* Add Property Page

---

## 🌟 Future Enhancements

* Google Authentication
* Email Verification
* Password Reset
* Property Reviews & Ratings
* Google Maps Integration
* Online Rent Payment
* Real-time Chat
* Booking System
* Admin Dashboard
* Property Recommendation System

---

## 📚 Learning Outcomes

This project helped strengthen my understanding of:

* Full Stack Web Development
* RESTful API Design
* JWT Authentication
* Password Encryption with bcrypt
* MongoDB & Mongoose
* CRUD Operations
* Role-Based Access Control (RBAC)
* File Uploads
* Environment Variable Management
* Deployment using Vercel and Render

---

## 👩‍💻 Author

**Pratiti Paul**

GitHub: https://github.com/Pratiti-paul

LinkedIn: *(Add your LinkedIn profile here)*

---

## ⭐ If you found this project useful, consider giving it a star!
