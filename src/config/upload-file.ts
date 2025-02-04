import { Request } from 'express';
import multer, { StorageEngine } from 'multer';

const imageStorage: StorageEngine = multer.diskStorage({
  filename: (req: Request, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  }
});

export const handleImage = multer({
  storage: imageStorage
}).single('picture_url');