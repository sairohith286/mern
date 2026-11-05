# Marcus Book Store — Express + MongoDB Backend

This is the backend for the React Book Store ZIP you supplied. It provides REST APIs for the nine books in your current catalogue, account registration/login, authenticated orders, and contact form submissions.

## 1. Requirements

- Node.js 20 or newer
- A MongoDB Atlas database (recommended for deployment)
- MongoDB Compass (desktop GUI, optional but useful)

> Compass is a database viewer/manager. It does not host your database. Create a free MongoDB Atlas cluster, then connect Compass to the Atlas connection string.

## 2. Install and run locally

1. Extract this backend ZIP.
2. Open a terminal inside the extracted `marcus-book-store-backend` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env`.
5. Replace `MONGODB_URI` with your MongoDB Atlas connection string and set a long random `JWT_SECRET`.
6. Start the API:

   ```bash
   npm run dev
   ```

7. In another terminal (or after stopping the server), insert the nine catalogue books:

   ```bash
   npm run seed
   ```

8. Test the health endpoint at `http://localhost:5000/api/health`.

## 3. MongoDB Atlas + Compass

1. Create a free cluster at https://www.mongodb.com/atlas.
2. In Atlas, create a database user and allow your current IP in Network Access. For deployment, configure network access according to Atlas guidance; do not expose database credentials.
3. Choose **Connect → Drivers**, copy the Node.js connection string, and put it in `.env` as `MONGODB_URI`. Replace the password placeholder and use the database name `marcus_book_store`.
4. In MongoDB Compass, choose **New Connection**, paste the same Atlas URI, and connect.
5. After `npm run seed` and after creating accounts/orders, refresh Compass. Collections are created when data is inserted.

## 4. API endpoints

Base URL locally: `http://localhost:5000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check API status |
| GET | `/api/books` | List books |
| GET | `/api/books?category=fiction` | Filter by category |
| GET | `/api/books?featured=true` | Featured books |
| GET | `/api/books?search=camus` | Search books |
| GET | `/api/books/:bookId` | Get one book |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Current user (Bearer token) |
| POST | `/api/orders` | Place order (Bearer token) |
| GET | `/api/orders/my-orders` | List signed-in user's orders |
| GET | `/api/orders/:orderId` | Get own order |
| POST | `/api/contact` | Save contact message |

### Register request

```json
{
  "name": "Reader Name",
  "email": "reader@example.com",
  "password": "minimum6chars"
}
```

### Login request

```json
{
  "email": "reader@example.com",
  "password": "minimum6chars"
}
```

Both return a JWT `token`. Send it on protected requests:

```http
Authorization: Bearer YOUR_TOKEN
```

### Place order request

The backend recalculates prices from MongoDB; do not trust totals sent by the browser.

```json
{
  "items": [
    { "bookId": "atomic-habits", "quantity": 1 },
    { "bookId": "meditations", "quantity": 2 }
  ],
  "shippingAddress": {
    "fullName": "Reader Name",
    "phone": "9876543210",
    "address": "House, Street, Landmark",
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "pinCode": "522001"
  }
}
```

## 5. Deploy backend to Vercel

Deploy this backend as a separate Vercel project:

1. Push the contents of this backend folder to a new GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the project root at the repository root. No build command is required; Vercel detects `api/index.js`.
4. Add these Environment Variables in Vercel Project Settings:
   - `MONGODB_URI` — Atlas connection string
   - `JWT_SECRET` — long random secret (not the example value)
   - `JWT_EXPIRES_IN` — `7d` (optional)
   - `CLIENT_URL` — your deployed React frontend URL, e.g. `https://your-book-store.vercel.app`
5. Deploy. Test `https://YOUR-BACKEND.vercel.app/api/health`.
6. Run `npm run seed` locally once using the same Atlas `MONGODB_URI` to populate the catalogue.

Do not commit `.env` or share your Atlas password/JWT secret. If you change the frontend domain, update `CLIENT_URL` and redeploy.

## 6. Important frontend integration note

Your supplied React project currently uses localStorage for login, cart, and checkout, and its book catalogue is imported from `src/data/books.js`. This ZIP adds the backend API, but it does **not** silently change your React files. The next integration step is to update:

- `AuthContext.jsx` to call `/api/auth/register` and `/api/auth/login`, then retain the returned token.
- Book loading to call `/api/books` (or keep the current local catalogue until you are ready).
- `CheckoutPage.jsx` to send item `bookId`/quantity and shipping details to `/api/orders` with the Bearer token.
- `ContactPage.jsx` to submit to `/api/contact`.
- `CartContext.jsx` can remain localStorage-based initially; a server-side persistent cart is not included in this first backend version.

Set the frontend environment variable (Vite) to the deployed API base URL, for example:

```env
VITE_API_URL=https://YOUR-BACKEND.vercel.app/api
```

Then use `import.meta.env.VITE_API_URL` in the React API calls. Redeploy the frontend after setting this variable.

## Notes

- Passwords are hashed with bcrypt.
- JWT authentication protects profile and order endpoints.
- Order prices are read from MongoDB on the server.
- This starter does not include payment gateway integration, admin dashboard, inventory management, or email notifications.
