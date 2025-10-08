# Estate 

A web application for buying and selling properties. This project allows users to browse, buy, and sell properties. Sellers can list their properties, and buyers can view them and contact the seller (contact feature is currently disabled).

---

## Features

- **User Roles:**  
  - **Buyer:** Can browse and view listed properties.  
  - **Seller:** Can list properties with details and images.

- **Property Listings:**  
  - Add property details such as name, price, location, description, and images.  
  - Browse and filter properties.

- **Image Uploads:**  
  - Property images are uploaded using **Multer** (currently stored locally; should switch to cloud storage for production).

- **Contact Sellers:**  
  - Buyers can contact sellers to inquire about a property (currently disabled).

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **File Uploads:** Multer  
- **Frontend:** Vite + React.js  
- **Environment Variables:** `.env` (for MongoDB URI, JWT secret, etc.)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/estate.git
cd estate-marketplace
Install backend dependencies:

bash
Copy code
cd backend
npm install
Create a .env file in the backend folder:

env
Copy code
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy code
nodemon server.js
Run the frontend:

bash
Copy code
cd frontend
npm install
npm run dev
