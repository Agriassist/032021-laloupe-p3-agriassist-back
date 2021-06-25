const express = require('express');
const multer = require('multer');

const app = express();
const cors = require('cors');
const mainRouter = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('public/images_profil'));

app.post('/api/fileUpload', (req, res) => {
  // console.log(Object.keys(req));
  // configuration du dossier où stocker l'image et le nom de l'image
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log("file : ", file);
      cb(null, 'public/images_profil');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  // on configure multer pour sauvegarder un seul fichier qui est dans req.body.file
  const upload = multer({ storage: storage }).single('file');

  upload(req, res, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // on peut sauvegarder le nom et d'autres données de l'image dans une table de la BDD
      // ....
      // console.log(req.file);
      res.status(201).json({ filename: req.file.filename, alt: req.description });
    }
  });
});

app.get('/', (req, res) => {
  res.status(200).json({ foo: 'hello' });
});

app.use('/api', mainRouter);

module.exports = app;
