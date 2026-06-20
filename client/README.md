<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StayNear Documentation</title>
</head>
<body>

    <h1>StayNear</h1>

    <p>
        <strong>StayNear</strong> is a full-stack accommodation discovery platform
        that helps students and working professionals find verified PGs, hostels,
        and rental accommodations near colleges, universities, and workplaces.
    </p>

    <p>
        The platform supports <strong>Role-Based Access Control (RBAC)</strong>
        with three user roles:
    </p>

    <ul>
        <li><strong>Seeker</strong> – Search and explore accommodations</li>
        <li><strong>Owner</strong> – List and manage properties</li>
        <li><strong>Admin</strong> – Manage users, listings, and platform operations</li>
    </ul>

    <hr>

    <h2>🚀 Features</h2>

    <h3>Authentication & Authorization</h3>

    <ul>
        <li>User Registration</li>
        <li>User Login</li>
        <li>JWT Authentication</li>
        <li>Password Hashing using bcrypt</li>
        <li>Role-Based Access Control (RBAC)</li>
    </ul>

    <h3>Supported Roles</h3>

    <ul>
        <li>Seeker</li>
        <li>Owner</li>
        <li>Admin</li>
    </ul>

    <h3>Seeker Features</h3>

    <ul>
        <li>Browse verified PGs and hostels</li>
        <li>Search accommodations</li>
        <li>View property details</li>
        <li>Save properties to wishlist</li>
        <li>Send inquiries to owners</li>
        <li>Manage profile</li>
    </ul>

    <h3>Owner Features</h3>

    <ul>
        <li>Add property listings</li>
        <li>Edit property details</li>
        <li>Manage inquiries</li>
        <li>Track listed accommodations</li>
    </ul>

    <h3>Admin Features</h3>

    <ul>
        <li>Manage users</li>
        <li>Manage property listings</li>
        <li>Monitor platform activity</li>
        <li>Role management</li>
    </ul>

    <hr>

    <h2>🛠 Tech Stack</h2>

    <h3>Frontend</h3>

    <ul>
        <li>React.js</li>
        <li>React Router DOM</li>
        <li>Tailwind CSS</li>
        <li>Axios</li>
        <li>Lucide React Icons</li>
        <li>Vite</li>
    </ul>

    <h3>Backend</h3>

    <ul>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB Atlas</li>
        <li>Mongoose</li>
        <li>JWT Authentication</li>
        <li>bcryptjs</li>
    </ul>

    <h3>Database</h3>

    <ul>
        <li>MongoDB Atlas</li>
    </ul>

    <hr>

    <h2>📁 Project Structure</h2>

    <pre>
StayNear
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.html
    </pre>

    <hr>

    <h2>🔐 Authentication Flow</h2>

    <h3>Registration</h3>

    <p>User provides:</p>

    <ul>
        <li>Name</li>
        <li>Email</li>
        <li>Password</li>
        <li>Role</li>
    </ul>

    <p>Available Roles:</p>

    <ul>
        <li>Seeker</li>
        <li>Owner</li>
        <li>Admin</li>
    </ul>

    <p>
        After successful registration, the user is redirected to the Login Page.
    </p>

    <h3>Login</h3>

    <p>User provides:</p>

    <ul>
        <li>Email</li>
        <li>Password</li>
        <li>Role</li>
    </ul>

    <p>Backend verifies:</p>

    <ul>
        <li>User Exists</li>
        <li>Password Matches</li>
        <li>Role Matches</li>
    </ul>

    <p>
        Upon successful login, a JWT Bearer Token is generated and stored
        in localStorage.
    </p>

    <hr>

    <h2>🔑 Protected Routes</h2>

    <h3>Seeker Routes</h3>

    <ul>
        <li>/home</li>
        <li>/explore</li>
        <li>/wishlist</li>
        <li>/inquiries</li>
        <li>/profile</li>
    </ul>

    <h3>Owner Routes</h3>

    <ul>
        <li>/owner</li>
    </ul>

    <h3>Admin Routes</h3>

    <ul>
        <li>/admin</li>
    </ul>

    <p>
        Unauthorized access results in:
        <strong>403 Forbidden</strong>
    </p>

    <hr>

    <h2>⚙ Environment Variables</h2>

    <pre>
PORT=5002

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRE=7d

NODE_ENV=development
    </pre>

    <hr>

    <h2>📦 Installation</h2>

    <h3>Clone Repository</h3>

    <pre>
git clone https://github.com/yourusername/staynear.git

cd staynear
    </pre>

    <h3>Backend Setup</h3>

    <pre>
cd server

npm install

npm run dev
    </pre>

    <p>Backend runs at:</p>

    <pre>
http://localhost:5002
    </pre>

    <h3>Frontend Setup</h3>

    <pre>
cd client

npm install

npm run dev
    </pre>

    <p>Frontend runs at:</p>

    <pre>
http://localhost:5173
    </pre>

    <hr>

    <h2>🗄 MongoDB Setup</h2>

    <ol>
        <li>Create MongoDB Atlas account</li>
        <li>Create Cluster</li>
        <li>Add IP Address</li>
        <li>Create Database User</li>
        <li>Copy Connection String</li>
        <li>Add connection string to .env file</li>
    </ol>

    <p>Example:</p>

    <pre>
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
    </pre>

    <hr>

    <h2>🎨 Design System</h2>

    <h3>Primary Colors</h3>

    <ul>
        <li>Teal — #0F766E</li>
        <li>Dark Teal — #134E4A</li>
        <li>Navy — #0F172A</li>
        <li>Slate — #1E293B</li>
    </ul>

    <h3>Design Principles</h3>

    <ul>
        <li>Clean</li>
        <li>Minimal</li>
        <li>Professional</li>
        <li>Student-focused</li>
    </ul>

    <hr>

    <h2>🔮 Future Enhancements</h2>

    <ul>
        <li>Google Authentication</li>
        <li>Email Verification</li>
        <li>Property Reviews & Ratings</li>
        <li>Real-time Chat</li>
        <li>Notifications</li>
        <li>Map Integration</li>
        <li>AI Property Recommendations</li>
        <li>Payment Gateway</li>
        <li>Owner Analytics Dashboard</li>
        <li>Mobile Application</li>
    </ul>

    <hr>

    <h2>👥 Contributors</h2>

    <p>
        Team StayNear
    </p>

    <p>
        Built to simplify student accommodation discovery and help users
        find trusted stays near their educational institutions and workplaces.
    </p>

    <hr>

    <h2>📄 License</h2>

    <p>
        This project is licensed under the MIT License.
    </p>

    <hr>

    <blockquote>
        <strong>StayNear — Find. Compare. Connect.</strong><br>
        Helping students discover verified stays near their campus and workplace.
    </blockquote>

</body>
</html>