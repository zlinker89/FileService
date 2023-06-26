import * as path from "path"
import { v4 as uuidv4 } from 'uuid';

export const fileName = (req, file, cb) => {
  cb(null, uuidv4() + path.extname(file.originalname))
}