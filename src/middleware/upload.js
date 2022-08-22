const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './product_photo')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    const uniqueSuffix = `post-${uuidv4()}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`
    cb(null, uniqueSuffix)
  }
})

const filter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
  }
  if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
    return cb(new Error('The image extension is not supported'))
  }
  cb(null, true)
}

const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: { fileSize: 1024 * 1024 * 2, files: 1 }
})

module.exports = upload