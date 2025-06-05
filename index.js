const express = require('express');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;


const cors = require('cors');
const allowedOrigins = [
  // 'http://localhost:3000', // for local dev
  'https://mypetfrontend1.vercel.app', // replace with your real deployed frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));




//cookie parser middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.use(express.json());

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use("/uploads", express.static("uploads"));


const dbconnect = require("./config/database")
dbconnect();

//routes import
const user = require("./routes/user")
app.use("/api/v1",user);






app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// app.get('/api/v1/pet/:id', (req, res) => {
//   const pet = pets[req.params.id];
//   if (pet) {
//     res.json({ success: true, pet });
//   } else {
//     res.status(404).json({ success: false, message: 'Pet not found' });
//   }
// });

// app.listen(PORT,'0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});



