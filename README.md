# LinkNest
LinkNest is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) project that allows users to create multiple "nests," each containing multiple URLs. 
Users can share a single unique link for each nest to showcase all their important links in one place.

## 🎯 Features
- **JWT Authentication**: Secure signup/login.
- **Profile Management**: Users can update their details and profile picture.
- **Nest Creation**: Users can create multiple nests to organize links.
- **Customizable Sharing**: Each nest has a unique sharable link.

## 🛠️ Tech Stack
- **Frontend**: React.js, HTML/CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/linknest.git
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup (in new terminal)
```sh
cd frontend
npm install
npm run dev
```

## 🌍 Environment Variables

### 1️⃣ Create a `.env` file in the backend directory and add:
```
PORT=8000
SALT_ROUNDS=10
JWT_SECRET="bk0nYoKLYv0gg2kU7qAm"
DB_ONLINE_URL="mongodb://127.0.0.1:27017/linknest"
```

### 1️⃣ Create a `.env` file in the frontend directory and add:
```
VITE_BACKEND_URL='http://localhost:8000'
```

## 📷 Screenshots
(Add relevant screenshots here)

## 📜 License
This project is licensed under the MIT License.

## 📞 Contact
For any issues, reach out at [yatharth2906@gmail.com] or open an issue on GitHub.

