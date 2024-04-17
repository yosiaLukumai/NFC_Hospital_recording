const app = require("express")();
const express = require("express");
const dbConfig = require("./db/connect");
const picModel = require("./models/reports")
const multer = require("multer")
const path = require("path")
const userRoutes = require("./routes/users");
const dataRoutes = require("./routes/data")
const wardRoutes = require("./routes/ward")
const patientRoutes = require("./routes/patients")
const checkUpRoutes = require("./routes/checkup")
const cors = require("cors");
const { Server } = require('socket.io')
const http = require("http");
const { createOutput } = require("./utils");
require("dotenv").config();
// database configuration
dbConfig.connectDb();

//cors config
// limiting all the acces that comes from other hosting
app.use(cors());
// allowing the json and url encoded in the requesst body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
  res.send("LOL testing wooh");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads will be stored in the "uploads/" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept only image files
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};


const upload = multer({ storage, fileFilter });



app.post("/data/upload/image", upload.single("image"), function (req, res, next) {
  try {

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    let imgPath = path.join("uploads", req.file.filename);
    // saving the image filename into database
    let saved = picModel.create({ imgPath })
    if (saved) res.json(createOutput(false, "file saved successful.."));



  } catch (error) {
    res.json(createOutput(false, error.message))
  }

})

// bringing all the routes
userRoutes.userRoutes(app);
// routes for handling the data
patientRoutes.patientRoutes(app)
wardRoutes.wardRoutes(app)
checkUpRoutes.checkUpRoutes(app)
dataRoutes.dataRoutes(app)
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on("connect", (socket) => {
  console.log('connected')
  // console.log(socket);
  socket.on("disconnect", () => {
    console.log("client disconnected..");
  })
})
server.listen(process.env.PORT, () => {
  console.log(`App running and connected to port ${process.env.PORT}`);
});
module.exports.Socket = io