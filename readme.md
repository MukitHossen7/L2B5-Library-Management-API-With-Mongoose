# Library Management API

A powerful RESTful API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** that allows users to manage books and borrowing functionality in a library system.

---

## Features

- Full CRUD for managing books
- Validation with Mongoose Schema
- Aggregation pipeline to summarize borrowed books
- Static method to control book availability
- Business logic enforcement (like stock check before borrowing)
- Mongoose middleware (pre/post) used
- Filtering, sorting, and pagination in book listing
- Easy-to-use endpoints with consistent responses

---

## Objective

> Build a **Library Management System** that handles **book inventory** and **borrow tracking** with full validation, business logic, and clean architecture.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **ts-node-dev**
- **dotenv**

---

## Installation & Setup

```

git clone https://github.com/MukitHossen7/L2B5-Library-Management-API-With-Mongoose.git

```

```
cd library-management-api
```

```
npm install
```

```
npm run dev
```

```
Make sure you have a MongoDB connection string set in your `.env`:

```

---

## Project Structure

```
src/
├── modules/
│   ├── book/
│   │   ├── book.controller.ts
        ├── book.interface.ts
│   │   ├── book.model.ts
│   │   └── book.route.ts
│   ├── borrow/
│   │   ├── borrow.controller.ts
        ├── book.interface.ts
│   │   ├── borrow.model.ts
│   │   └── borrow.route.ts
├── routes/
│   └── index.ts
├── app.ts
└── server.ts
```

---

## API Endpoints

### Book Endpoints

#### 1. **Create Book**

```
POST /api/books
```

```json
Request Body:
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### 2. **Get All Books (with filter, sort, limit)**

```
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

#### 3. **Get Book by ID**

```
GET /api/books/:bookId
```

#### 4. **Update Book**

```
PUT /api/books/:bookId
```

```json
{
  "copies": 50
}
```

#### 5. **Delete Book**

```
DELETE /api/books/:bookId
```

---

### Borrow Endpoints

#### 6. **Borrow a Book**

```
POST /api/borrow
```

```json
Request Body:
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Business Logic Enforced**:

- Checks if enough copies are available.
- Deducts copies from the book.
- If copies hit 0, sets `available` to false via static method.

#### 7. **Borrowed Books Summary**

```
GET /api/borrow
```

Returns total borrowed quantities per book using aggregation pipeline.

---

## Success Response Format

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

## Error Response Format

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

---

## 📌 Important Notes

- ⚠️ **Genres must be one of:** FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
- ❗ **Copies** must be a non-negative number.
- 🔁 Uses Mongoose `pre` and `post` middleware for hooks.
- 📊 Uses aggregation to fetch borrowing summary report.

---

## 🧠 Additional Tips

- Always validate incoming data before processing.
- Use Postman or Thunder Client to test endpoints.
- Implement pagination for scalable queries.
- Modular architecture improves maintainability.

---

## 👨‍💻 Author

Developed as part of an academic assignment by _\[Your Name]_
Feel free to fork, contribute, or use this boilerplate in your own projects.

---

## 📃 License

This project is licensed under the MIT License.

```

---


```

```

```
