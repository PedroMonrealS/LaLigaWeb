const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './src/uploads');
    },
    filename: function(req, file, cb){
        const originalname = file.originalname;
        const extension = originalname.split('.').pop();
        const timestamp = Date.now(); 
        const filename = `${originalname.split('.').slice(0, -1).join('_')}_${timestamp}.${extension}`; //He hecho que guarde el nombre original _ fecha 
        cb(null, filename);
    }
});

const upload = multer({storage});

module.exports = upload;
