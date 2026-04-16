# API Documentation - User Management Service

Base URL: `http://localhost:3000`

## 1. Get All Users
- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Mengambil seluruh data user yang ada pada database.
- **Parameters**: None
- **Contoh Request**:
  ```http
  GET / HTTP/1.1
  Host: localhost:3000
  ```
- **Contoh Response (200 OK)**:
  ```json
  {
      "success": true,
      "count": 2,
      "data": [
          {
              "_id": "645cb2b5f1a9b2b5f1a9b2b5",
              "nama": "Adi Saputra",
              "email": "adi@example.com",
              "password": "password123",
              "createdAt": "2023-05-11T10:00:00.000Z",
              "updatedAt": "2023-05-11T10:00:00.000Z",
              "__v": 0
          }
      ]
  }
  ```

## 2. Get User By ID
- **Endpoint**: `/:id`
- **Method**: `GET`
- **Description**: Mengambil detail user berdasarkan ID unik MongoDB (`_id`).
- **Parameters**: 
  - `id` (Path Parameter) - String ObjectId dari MongoDB.
- **Contoh Request**:
  ```http
  GET /645cb2b5f1a9b2b5f1a9b2b5 HTTP/1.1
  Host: localhost:3000
  ```
- **Contoh Response (200 OK)**:
  ```json
  {
      "success": true,
      "data": {
          "_id": "645cb2b5f1a9b2b5f1a9b2b5",
          "nama": "Adi Saputra",
          "email": "adi@example.com",
          "password": "password123",
          "createdAt": "2023-05-11T10:00:00.000Z",
          "updatedAt": "2023-05-11T10:00:00.000Z",
          "__v": 0
      }
  }
  ```

## 3. Create User
- **Endpoint**: `/`
- **Method**: `POST`
- **Description**: Menambahkan data user baru.
- **Parameters** (Body - application/json):
  - `nama` (String, required)
  - `email` (String, required, unique)
  - `password` (String, required, minlength: 6)
- **Contoh Request**:
  ```json
  {
      "nama": "John Doe",
      "email": "johndoe@example.com",
      "password": "securepassword"
  }
  ```
- **Contoh Response (201 Created)**:
  ```json
  {
      "success": true,
      "data": {
          "nama": "John Doe",
          "email": "johndoe@example.com",
          "password": "securepassword",
          "_id": "645d...",
          "createdAt": "2023-05-11T12:00:00.000Z",
          "updatedAt": "2023-05-11T12:00:00.000Z",
          "__v": 0
      }
  }
  ```

## 4. Update User
- **Endpoint**: `/:id`
- **Method**: `PUT`
- **Description**: Memperbarui seluruh/sebagian data user berdasarkan ID unik.
- **Parameters** (Path & Body):
  - `id` (Path Parameter)
  - Body: `nama`, `email`, atau `password`
- **Contoh Request**:
  ```json
  {
      "nama": "John Doe Updated"
  }
  ```
- **Contoh Response (200 OK)**:
  ```json
  {
      "success": true,
      "data": {
          "_id": "645d...",
          "nama": "John Doe Updated",
          "email": "johndoe@example.com",
          "password": "securepassword",
          "createdAt": "2023-05-11T12:00:00.000Z",
          "updatedAt": "2023-05-11T12:05:00.000Z",
          "__v": 0
      }
  }
  ```

## 5. Delete User
- **Endpoint**: `/:id`
- **Method**: `DELETE`
- **Description**: Menghapus user berdasarkan ID unik.
- **Parameters**: 
  - `id` (Path Parameter)
- **Contoh Request**:
  ```http
  DELETE /645d... HTTP/1.1
  Host: localhost:3000
  ```
- **Contoh Response (200 OK)**:
  ```json
  {
      "success": true,
      "message": "User deleted successfully",
      "data": {}
  }
  ```
