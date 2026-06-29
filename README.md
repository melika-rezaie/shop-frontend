# Shop Frontend

Modern e-commerce frontend built with React, Tailwind CSS, and Vite.

## Features

- User Authentication (Login, Register)
- Product listing with search
- Shopping Cart with Context API
- Order placement
- Order history
- Admin Panel:
  - Dashboard with stats
  - Product management (CRUD)
  - Order management
  - User management (roles & delete)
- Responsive design with Tailwind CSS

## Tech Stack

- React 18
- React Router DOM 6
- Tailwind CSS 3
- Context API (Cart & Auth)
- Axios
- Vite

Backend Repository
[Shop-backend
](https://github.com/melika-rezaie/shop-backend)

License
MIT

## Installation

```bash
# Clone the repository
git clone https://github.com/melika-rezaie/shop-frontend.git
cd shop-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add API URL to .env
VITE_API_URL=http://localhost:8000/api

# Start development server
npm run dev
Environment Variables
Variable	Description
VITE_API_URL	Backend API URL (e.g., http://localhost:8000/api)
Project Structure
text
src/
├── api/           # Axios API calls
├── components/    # Reusable components (Navbar)
├── context/       # Auth & Cart Context
├── pages/
│   ├── admin/     # Admin pages (Dashboard, Products, Orders, Users)
│   ├── Products.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Orders.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── App.jsx
└── main.jsx
