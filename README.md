
# MOI-POS 🛒

A modern, full-stack Point of Sale (POS) and inventory management system built with Laravel (API) and React. This project handles daily sales operations, customer management, inventory tracking, and order processing.

## ✨ Features

**📊 Dashboard**
- Overview of key metrics: Sales Revenue, Accounts Receivable, Tax Payable.
- Order statistics: Total Orders, Pending Orders, Completed Orders.
- Quick view of the 5 most recent orders.

**🛍️ Point of Sale (POS)**
- Select customers and products via dropdowns.
- Adjust product quantity and add to cart.
- Place orders smoothly (new orders are set to 'Pending' status by default).

**📦 Order Management**
- View all orders (sorted by latest first) with pagination.
- Advanced search & filter by: Order No, Customer, Date, and Status.
- One-click order completion button.
- View order details and invoices.
- Print invoices or download them as PDF.

**🏷️ Product Management**
- Full CRUD functionality (Create, Read, Update, Delete) with image handling.
- Advanced filters: Search by Name, SKU, Min/Max Price, and Date Range.
- Data table with pagination.
- **Low Stock Alert:** Automatically highlights stock in red if the quantity drops below 10.

**👥 Customer Management**
- Full CRUD operations with pagination (sorted by latest).
- Global search functionality (filter by Name, Phone, Email, or Address).

## 🛠️ Tech Stack

**Frontend:**
- React (`^19.2.8`)
- Tailwind CSS
- Redux *(Note: Redux is implemented in this project purely for practice and learning purposes).*

**Backend:**
- PHP (`^8.3`)
- Laravel Framework (`^13.17`)
- Laravel Sanctum (`^4.0`) for API Authentication
- RESTful API Architecture

## 🚀 Installation & Setup

### Backend (Laravel)
1. Clone the repository and navigate to the backend folder.
2. Run `composer install`.
3. Copy `.env.example` to `.env` and configure your database.
4. Run `php artisan key:generate`.
5. Run `php artisan migrate`.
6. Start the server: `php artisan serve`.

### Frontend (React)
1. Navigate to the frontend folder.
2. Run `npm install`.
3. Configure the backend API URL in your environment variables.
4. Start the development server: `npm run dev`.

> More features and updates will be added in the future.
## 📸 Preview

<img width="1905" height="929" alt="image" src="https://github.com/user-attachments/assets/ee9d0525-e044-4238-82c1-726a3c2768bd" />
<img width="1905" height="929" alt="image" src="https://github.com/user-attachments/assets/c347b4ce-278a-4b92-991b-c63e0d2aeebe" />

<img width="1905" height="929" alt="image" src="https://github.com/user-attachments/assets/87ddecd2-0964-4ea7-a1f4-f07e8188f613" />
<img width="1907" height="931" alt="image" src="https://github.com/user-attachments/assets/86dad871-da8c-4e99-92c3-bd6c70516361" />
<img width="1907" height="931" alt="image" src="https://github.com/user-attachments/assets/8ec820dd-38e4-467f-9169-d0fd3f2bf973" />

<img width="1903" height="935" alt="image" src="https://github.com/user-attachments/assets/aa89ae81-d91c-49e0-b52d-9a8291daf5f5" />
<img width="1907" height="931" alt="image" src="https://github.com/user-attachments/assets/f92cd1c5-77ef-43f3-a8c4-6ebf2e09a55c" />
