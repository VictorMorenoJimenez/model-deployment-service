import multer from 'multer';

function fileFilter(req, file, cb) {
  if (file.originalname.endsWith('.onnx')) {
    cb(null, true);
  } else {
    cb(new Error('Your model should be an ONNX file'));
  }
}

const uploadMiddleware = multer({ dest: 'models/', fileFilter });

export default uploadMiddleware;
