const multer = require("multer");

// Set the destination and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Configure multer with the storage options
const upload = multer({ storage: storage });

// Middleware function to handle file upload
exports.handleFileUpload = upload.array("file"); // 'files' should match the field name in your file upload form
