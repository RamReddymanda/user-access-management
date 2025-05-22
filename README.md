# Software Access Management System

A role-based access control application for managing software resources and access requests across different user roles: **Admin**, **Manager**, and **Employee**.

---

## 🚀 Project Overview

This project is designed to streamline software resource management within an organization by providing different functionalities based on user roles:

- **Admin:** Full control over software lifecycle and request approvals.
- **Manager:** Authority to approve or reject access requests.
- **Employee:** Ability to browse software inventory, request access, and track request statuses.

This system ensures secure, scalable, and maintainable user management with JWT authentication and role-based authorization.

---

## 🧩 Features

### Admin

- Login with secure authentication.
- Create, update, and delete software records.
- Approve or reject pending access requests.
- Manage user roles and permissions (optional for future).

### Manager

- Login with secure authentication.
- Approve or reject pending access requests.

### Employee

- Signup and login functionality.
- View all available software resources.
- Request access to software.
- Track status of submitted requests on a dedicated "My Requests" page.

---

## 🔧 Technology Stack

| Layer             | Technology                             |
|-------------------|-------------------------------------|
| Backend           | Node.js, Express.js, TypeORM         |
| Database          | PostgreSQL                           |
| Authentication    | JWT (JSON Web Tokens), bcrypt        |
| Frontend          | React.js, React Router, Axios, styled-components |
| Development Tools | dotenv, CORS, reflect-metadata       |

---

## ⚙️ Backend Details

- **Express.js** server handling REST API endpoints.
- **TypeORM** for object-relational mapping with PostgreSQL.
- Password hashing with **bcrypt** ensuring secure password storage.
- Token-based authentication using **jsonwebtoken** with role-based middleware for authorization.
- Environment configuration managed via **dotenv**.
- CORS enabled for cross-origin communication with React frontend.

---

## 🌐 Frontend Details

- React single-page application using functional components and hooks.
- Navigation handled with **React Router Dom**.
- HTTP client requests managed with **Axios**.
- Styling done using **styled-components** for modular and reusable CSS.
- Responsive UI for easy software browsing and request management.

---

## Authentication & Authorization

- Uses JWT tokens stored on the client to secure routes.
- Middleware validates tokens and checks user roles (**Admin**, **Manager**, **Employee**) to enforce access control.
- Passwords hashed with **bcrypt** before saving to the database.
- Secure login, signup, and logout flows implemented.

---

## 🧪 Testing

- Manual testing performed for all user roles.
- API endpoints verified using tools like Postman.
- React UI tested for responsiveness and role-based rendering.

---
## 📞 Contact

For questions or feedback, reach out at [ramreddymandha87@gmail.com].

---

Thank you for reviewing this project! 🙌
