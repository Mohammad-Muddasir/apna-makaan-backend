require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const app = express();
const connectDB = require('./database/db')
const userRouter = require('./routes/routes')
const loginRouter = require('./routes/login')
const productRouter = require("./routes/product")
const morgan = require("morgan");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3005;
const cors = require("cors");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v2", userRouter);
app.use("/api/v2", loginRouter);
app.use("/api/v2", productRouter);

// Socket.IO connection logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle events from the client
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});






start();
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


