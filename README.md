# 🚗 Poolify - MERN Stack Carpooling Platform

**Poolify** is a full-stack MERN web application built for college students to organize, post, and join carpool rides. It enables users to reduce travel costs, save time, and coordinate with peers easily — all in a secure, login-based environment.

---

## 🧱 Tech Stack

- **Frontend:** React, React Router, Axios  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT-based login/signup  
- **UI Icons:** React Icons  
- **Deployment-Ready:** Docker + Docker Compose  

---

## 🌟 Key Features

- 🔐 Secure user login and signup (JWT)
- 📝 Post ride offers with date, time, seats, and notes
- 📥 View and join available rides
- 📤 Manage rides posted and joined
- 💬 Built-in chat placeholder for future enhancement
- 📦 Fully containerized using Docker

---

## 🖥️ Local Development Setup

### 🔧 Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas cloud)
- Docker (optional, for containerized setup)

---

### 🔄 1. Clone the Repository

```bash
git clone https://github.com/26pratyush/Poolify-MERN.git
cd Poolify-MERN
````

---

### 📁 2. Run Without Docker (Directly with Node)

#### 📦 Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../client
npm install
```

#### 🌐 Start the App

```bash
# Start backend (port 5000)
cd ../backend
npm start

# In another terminal, start frontend (port 3000)
cd ../client
npm start
```

Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Run with Docker (Recommended)

```bash
# From project root
docker-compose up --build
```

This spins up:

* MongoDB (port 27017)
* Backend API (port 5000)
* React frontend (port 3000)

Visit: [http://localhost:3000](http://localhost:3000)

To stop:

```bash
docker-compose down
```

---

## 💡 Future Enhancements

* 🔔 Real-time notifications
* 🗺️ Map integration for route selection
* 📱 Mobile-friendly UI
* 🔄 GitHub Actions for CI/CD
* ☁️ Deployment to Render / Railway

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

![image](https://github.com/user-attachments/assets/a5ce0228-7c93-48f9-acef-62f56b88dccc)

![image](https://github.com/user-attachments/assets/610f2c20-2d4b-4519-87e9-54bfdb9cafb9)

![image](https://github.com/user-attachments/assets/c9565b2b-3cb2-4200-806f-a54c8642b8b4)

![image](https://github.com/user-attachments/assets/5436aa7d-2237-453b-b72e-2ddce9936b41)

![image](https://github.com/user-attachments/assets/a70d30b2-4478-4e03-8bdc-89fbc38a4240)

![image](https://github.com/user-attachments/assets/e464ee8f-c1eb-4587-9751-dbf2f235a70b)

![image](https://github.com/user-attachments/assets/774fb329-3bf3-415f-95e3-48641dbb0833)

![image](https://github.com/user-attachments/assets/0431f03b-0465-4e0a-ad40-008c4b905a94)

![image](https://github.com/user-attachments/assets/05d16117-2866-4adc-8230-38e762df611f)








