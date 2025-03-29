# LinkNest
LinkNest is a streamlined link management platform that is built using the MERN stack. It lets users create and share customizable "nests" containing multiple URLs. 
Designed for social media managers and content creators, it provides a centralized hub to showcase all important links with a single shareable URL.

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
![Image](https://github.com/user-attachments/assets/8d8d2798-6639-44e5-b331-42c3e3da153b)
![Image](https://github.com/user-attachments/assets/7fe9543c-8d9d-4474-bbd9-17d880c5bf43)

## 📞 Contact
For any issues, reach out at [yatharth2906@gmail.com] or open an issue on GitHub.

