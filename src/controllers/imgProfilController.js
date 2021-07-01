const multer = require('multer');

const ulploadImgProfil = (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images_profil');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage }).single('file');

  upload(req, res, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({ filename: req.file.filename, alt: req.description });
    }
  });
};

module.exports = {
  ulploadImgProfil,
};
