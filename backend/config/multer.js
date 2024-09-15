
// Change to CommonJS module if needed
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../photoupload/images'),
    filename: (req, file, cb) => {
         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

module.exports = upload;
