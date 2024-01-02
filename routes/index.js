let express = require('express');
let router = express.Router();
let usercontroller=require('../controller/logsign')
let imagecontroller=require('../controller/nameimage')
let blogcontroller=require('../controller/bolgcard')
let admincontroller=require('../controller/adminn')

const multer  = require('multer')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)    
  }
})

const upload = multer({ storage: storage })


// user data
router.get('/alluser',usercontroller.alluser)   
router.post('/signup',usercontroller.signup)   
router.post('/login',usercontroller.login)

// category
router.get('/alldata',admincontroller.middleware,imagecontroller.alldata)
router.post('/adddata', admincontroller.middleware,upload.single('image'),imagecontroller.adddata)
router.put('/updatedata',admincontroller.middleware, upload.single('image'),imagecontroller.updatedata)
router.delete('/deletedata',admincontroller.middleware, imagecontroller.deletedata)
  
// blogdata
router.get('/alluserblog',blogcontroller.alluserblog)
router.get('/singalblog/:id',blogcontroller.singleblog)
router.get('/blogall',usercontroller.middeldata,blogcontroller.blogall)
router.post('/blogadd',usercontroller.middeldata,upload.single('image'), blogcontroller.blogadd)
router.put('/blogupdate',usercontroller.middeldata,upload.single('image'), blogcontroller.blogupdate)
router.delete('/blogdelete',usercontroller.middeldata, blogcontroller.blogdelete)

// admindata
router.post('/adminsign', admincontroller.adminsign)   
router.post('/adminlog', admincontroller.adminlog)   
router.delete('/userdelete', admincontroller.userdelete)   




module.exports = router;
