/*sconst express =require("express");
const Resultat = require("../models/resultat");
const router = express.Router();
const multer = require("multer")
const checkauth = require("../middleware/check-user")
const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/file-folder");
  },
  filename:(req ,file ,cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
router.post('',multer({ storage: storage }).single("file"),
 (req,res,next)=> {
  const url = req.protocol + "://" + req.get("host");
    const resultat = new Resultat({
      num: req.body.num,
      object: req.body.object,
      filePath: url + "/file-folder/" + req.file.filename,
      userId:req.body.userId,
    });
    resultat.save()
    .then(result => {
    res.status(201).json({
      message : 'Result added succesfully',
      result:{
        ...result,
        id: result._id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: "Couldn't add result !",
      error: err
    });
    });
});
router.get('/data-admin/:id', (req,res,next)=> {

  Resultat.find({userId: req.params.id})
  .then(documents => {
    res.status(200).json({
      message : 'post runs seccesfully !',
      results :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  });
});
router.get('/data/:id', (req,res,next)=> {

  Resultat.find({userId: req.params.id})
  .then(documents => {
    res.status(200).json({
      message : 'post runs seccesfully !',
      results :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/delete/:id", (req, res, next) => {
  Resultat.deleteOne({ _id: req.params.id })
  .then(result => {
    res.status(200).json({ message: "Result deleted !" })
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Problem In deleting Results !"
    });
  });
});

router.get('/:code', (req,res,next)=> {

  Resultat.findOne({num: req.params.code})
  .select(['-_id','-userId','-updatedAt','-__v'])
  .then(documents => {
    res.status(200).json({
      result :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message : 'Results fetched seccesfully !',
      message : 'Couldn"t fetch result !',
      error: err
    });
  });
});



module.exports = router;
*/