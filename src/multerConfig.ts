import multer from "multer";
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dirName = path.join(process.cwd(), 'public');
    
    if(!fs.existsSync(dirName))
      fs.mkdirSync(dirName)
    
    dirName = path.join(dirName, 'images');
    
    fs.mkdirSync(dirName)

    cb(null, dirName)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage: storage })

export {upload}