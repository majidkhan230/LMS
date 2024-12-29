Here’s a detailed `README.md` section documenting all the routes for your backend:

```markdown
# API Documentation

This document provides details about the available routes in the backend, including descriptions, HTTP methods, examples, and the type of data expected for each endpoint.

---

## **User Routes**

### 1. **Register User**
- **Endpoint**: `/register`
- **Method**: `POST`
- **Description**: Allows a new user to register an account.
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **Success** (200):
    ```json
    {
      "message": "User created successfully",
      "user": {
        "_id": "string",
        "fullName": "string",
        "email": "string",
        "password": "hashed_password"
      },
      "token": "string"
    }
    ```
  - **Error** (400 or 404):
    ```json
    {
      "message": "User already exists" | "All fields are required" | "something went wrong",
      "error": "string (if applicable)"
    }
    ```

---

### 2. **User Login**
- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a token for authorization.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **Success** (200):
    ```json
    {
      "message": "Logged in successfully",
      "user": {
        "_id": "string",
        "fullName": "string",
        "email": "string"
      },
      "token": "string"
    }
    ```
  - **Error** (400 or 401):
    ```json
    {
      "message": "Invalid credentials" | "All fields are required"
    }
    ```

---

### 3. **Get User Profile**
- **Endpoint**: `/profile`
- **Method**: `GET`
- **Description**: Retrieves the authenticated user's profile information.
- **Authorization**: Requires a valid token (handled by middleware `authMiddleware.authUser`).
- **Response**:
  - **Success** (200):
    ```json
    {
      "_id": "string",
      "fullName": "string",
      "email": "string"
    }
    ```
  - **Error** (401):
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

### 4. **Logout User**
- **Endpoint**: `/logout`
- **Method**: `POST`
- **Description**: Logs out the user by clearing the authentication token.
- **Response**:
  - **Success** (200):
    ```json
    {
      "message": "Logged out successfully"
    }
    ```


### 6. **Update User Password**
- **Endpoint**: `/profile`
- **Method**: `PUT`
- **Description**: Allows an authenticated user to update their password. The user's ID is determined through the authentication token.
- **Authorization**: Requires a valid token (handled by middleware `authMiddleware.authUser`).
- **Request Body**:
  ```json
  {
    "password": "string"
  }
  ```
- **Response**:
  - **Success** (200):
    ```json
    {
      "message": "Password reset successfully",
      "user": {
        "_id": "string",
        "fullName": "string",
        "email": "string",
        "password": "hashed_password"
      }
    }
    ```
  - **Error** (404):
    ```json
    {
      "message": "User not found"
    }
    ```
  - **Error** (400 or other):
    ```json
    {
      "message": "An error occurred",
      "error": "string (if applicable)"
    }
    ```

---

## **Error Handling**
- **400**: Bad Request (e.g., missing fields in the request body).
- **401**: Unauthorized (e.g., invalid token or invalid credentials).
- **403**: Forbidden (e.g., server-side issues).
- **404**: Not Found (e.g., user not found).

---

## **Setup and Testing**
To test these routes:
1. Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to make API requests.
2. Ensure a valid `.env` file with a secret key (`SECRET_KEY`) for JWT.
3. Start the server and ensure your database is running.

### **Example cURL Command**
1. **Update Password**:
   ```bash
   curl -X PUT http://localhost:5000/profile \
   -H "Authorization: Bearer <your-token-here>" \
   -H "Content-Type: application/json" \
   -d '{"password": "newPassword123"}'
   ```

---

## **Contact**
For further support or questions, please open an issue on the repository or contact the developer.
```