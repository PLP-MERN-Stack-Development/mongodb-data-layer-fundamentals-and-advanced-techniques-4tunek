# MongoDB Data Layer – Fundamentals & Advanced Techniques

This repository demonstrates how to work with MongoDB's data layer using the native driver. You’ll learn how to perform CRUD operations, aggregation, pagination, projection, and more.

## Table of Contents

- 📦 Project Structure  
- 🔧 Prerequisites  
- ⚙️ Setup & Installation  
- 🚀 How to Run Scripts  
  - `insert_books.js`  
  - `queries.js`  
- 🧪 Sample Queries Implemented  
- 📋 Notes & Tips  
- 📝 License / Acknowledgements  

---

## 📦 Project Structure

mongodb-data-layer-fundamentals-and-advanced-techniques-4tunek/
├── insert_books.js # Script to seed the database with sample book data
├── queries.js # Script containing MongoDB queries & aggregation examples
├── package.json # Project metadata and dependencies
├── node_modules/ # Installed dependencies
└── README.md # This file


- `insert_books.js` seeds your MongoDB database with a list of sample books.  
- `queries.js` contains various queries, aggregations, sorting, pagination, etc.  
- `package.json` holds the project’s dependencies (e.g. `mongodb`).

---

## 🔧 Prerequisites

Before you run anything:

1. **Node.js** installed (v14+ recommended)  
2. **MongoDB server** running locally (default port 27017), or you have a connection URI if using a remote server.  
3. Basic knowledge of JavaScript & MongoDB.

---

## ⚙️ Setup & Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/mongodb-data-layer-fundamentals-and-advanced-techniques-4tunek.git
   cd mongodb-data-layer-fundamentals-and-advanced-techniques-4tunek

How to Run Scripts
1. Insert / Seed data
   node insert_books.js

2. Run queries & aggregations
   node queries.js

This script contains queries like:

- Find books by genre

- Filter by publication year

- Projection (only title, author, price)

- Sorting ascending / descending

- Pagination (5 per page)

- Aggregation pipelines (average price by genre, top author, grouping by decade, etc.)

- Each result is printed to the console (often via console.table() for readability).



