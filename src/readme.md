# 🚀 Shopping RBAC App – Backend (Day 2)

## 📌 Overview

This backend project is built using **Node.js, Express, and MongoDB** with a focus on **secure authentication and production-level practices**.

Day 2 focuses on:

* Security hardening
* Request validation
* Logging improvements

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

---

## 📂 Project Structure

```
src/
  config/
  controllers/
  middlewares/
    authMiddleware.js
    errorMiddleware.js
    validate.js
  models/
  routes/
  utils/
  validations/
  server.js
```

---

## 🔐 Day 2 – Security Enhancements

### 1. Install Dependencies

```bash
npm install helmet express-rate-limit hpp morgan joi
```

---

### 2. Security Middleware

Added in `server.js`:

```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const morgan = require('morgan');

app.use(helmet());
app.use(hpp());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
});

app.use('/api', limiter);
```

---

### 3. Request Validation (Joi)

#### Validation Schema

`src/validations/authValidation.js`

```javascript
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
```

---

#### Validation Middleware

`src/middlewares/validate.js`

```javascript
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: true });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validate;
```

---

#### Use in Routes

```javascript
router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
```

---

## 🧪 Running the Project

### Install dependencies

```bash
npm install
```

### Start server (development)

```bash
npm run dev
```

### Start server (production)

```bash
npm start
```

---

## 🌐 API Endpoints

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Get Profile (Protected)

```
GET /api/users/profile
Authorization: Bearer <token>
```

### Admin Route

```
GET /api/users/admin-only
Authorization: Bearer <token>
```

---

## 🔥 Features Implemented

* ✅ JWT Authentication
* ✅ Password hashing (bcrypt)
* ✅ Role-based authorization
* ✅ Protected routes
* ✅ Centralized error handling
* ✅ Security middleware (helmet, hpp, rate-limit)
* ✅ Request validation (Joi)
* ✅ Request logging (Morgan)

---

## 🧠 Interview Talking Points

* Used **JWT for stateless authentication**
* Implemented **role-based access control (RBAC)**
* Secured APIs with **helmet & rate limiting**
* Validated inputs using **Joi**
* Structured backend using **MVC architecture**
* Implemented **middleware-based error handling**

---

## 🚀 Next Steps (Day 2 Continued)

* Add **Winston logger**
* Implement **Refresh Token strategy**
* Move secrets to **Azure Key Vault**
* Add **input sanitization**
* Improve logging & monitoring

---

## 👨‍💻 Author

Nithin Gudala
