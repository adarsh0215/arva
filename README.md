# Arva

Arva is a comprehensive MERN stack application designed to facilitate managing and operating a coffee shop finder and ordering system. This application includes an admin panel for shop owners and a client-facing frontend for users to browse and order from coffee shops.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user registration and login.
- **Coffee Shop Listings**: Browse and search for coffee shops.
- **Order Management**: Place and manage orders.
- **Admin Panel**: Manage coffee shops, menus, and orders.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## Installation

### Clone the Repository

First, clone the repository to your local machine:


```bash
git clone https://github.com/your-username/arva.git
cd arva
```
### Install Dependencies
## Server
Navigate to the server directory and install the dependencies:

```bash
Copy code
cd server
npm install
```
## Client
- Navigate to the client directory and install the dependencies:

```bash
Copy code
cd ../client
npm install
```
## Admin
Navigate to the admin directory and install the dependencies:

```bash
Copy code
cd ../admin
npm install
```
### Running the Application
## Setting Up Environment Variables
Create a .env file in the server directory and add the following variables:

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

### Starting the Server
## Navigate to the server directory and start the server:

```bash
cd server
npm start
```
### Starting the Client
Open a new terminal window, navigate to the client directory, and start the client:

```bash
cd client
npm start
```
### Starting the Admin Panel
Open another new terminal window, navigate to the admin directory, and start the admin panel:

```bash
Copy code
cd admin
npm start
```
### Environment Variables
Ensure you have the following environment variables set in your .env file located in the server directory:

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```
### API Endpoints
# Coffee Shops
- GET /api/coffee-shops/list - Get a list of coffee shops
# Food
- GET /api/food/list - Get a list of food items
# User
- POST /api/user/register - Register a new user
- POST /api/user/login - Login a user
# Cart
- GET /api/cart - Get cart items
- POST /api/cart - Add items to the cart
# Orders
- GET /api/order - Get user orders
- POST /api/order - Place a new order

