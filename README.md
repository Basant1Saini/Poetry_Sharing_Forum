# Poetry Sharing Forum

A modern, full-stack web application for poetry enthusiasts to share, discover, and engage with poetry. Built with the MERN stack and modern web technologies.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **JavaScript (ES2022+)** - Latest JavaScript features
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hook Form** - Performant forms with easy validation
- **Framer Motion** - Smooth animations and transitions

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js 4** - Fast, unopinionated web framework
- **MongoDB 6** - NoSQL database
- **Mongoose 7** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **express-validator** - Input validation middleware

### Development Tools
- **npm** - Package manager
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **nodemon** - Development server auto-restart

## ✨ Features

### User Management
- User registration and authentication
- Profile creation and customization
- Password reset functionality
- User dashboard

### Poetry Features
- Create, edit, and delete poems
- Rich text editor for poem composition
- Poetry categories and tags
- Search and filter poems
- Featured poems section

### Social Features
- Like and comment on poems
- Follow other poets
- User activity feed
- Poetry collections/favorites
- Share poems on social media

### Additional Features
- Responsive design for all devices
- Dark/light theme toggle
- Real-time notifications
- Poetry reading statistics
- Admin panel for content moderation

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v6.0 or higher)
- **Git**

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/poetry-sharing-forum.git
cd poetry-sharing-forum
```

### 2. Install dependencies

#### Backend dependencies
```bash
cd backend
npm install
```

#### Frontend dependencies
```bash
cd ../frontend
npm install
```

### 3. Environment Configuration

Create `.env` files in both frontend and backend directories:

#### Backend `.env`
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/poetry_forum
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

#### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Poetry Sharing Forum
```

### 4. Database Setup

Make sure MongoDB is running on your system:
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

## 🚀 Running the Application

### Development Mode

#### Start the backend server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

#### Start the frontend development server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Production Mode

#### Build the frontend
```bash
cd frontend
npm run build
```

#### Start the production server
```bash
cd backend
npm start
```

## 📁 Project Structure

```
poetry-sharing-forum/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── package.json
└── README.md
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `PUT /api/auth/reset-password/:token` - Reset password

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/follow/:id` - Follow/unfollow user

### Poetry Endpoints
- `GET /api/poems` - Get all poems (with pagination)
- `POST /api/poems` - Create new poem
- `GET /api/poems/:id` - Get poem by ID
- `PUT /api/poems/:id` - Update poem
- `DELETE /api/poems/:id` - Delete poem
- `POST /api/poems/:id/like` - Like/unlike poem
- `POST /api/poems/:id/comment` - Add comment

## 🎨 UI Components

### Key Components
- **PoemCard** - Display individual poems
- **PoemEditor** - Rich text editor for creating poems
- **UserProfile** - User profile display
- **SearchBar** - Search functionality
- **Navigation** - Responsive navigation bar
- **ThemeToggle** - Dark/light mode switcher

## 🔧 Scripts

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

### Backend Scripts
```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
npm run seed         # Seed database with sample data
npm test             # Run tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the flexible database
- Tailwind CSS for the utility-first approach
- All contributors and poetry enthusiasts

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact us at support@poetryforum.com
- Join our Discord community

---

**Happy Poetry Sharing! 📝✨**