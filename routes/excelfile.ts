import { Router } from "express";
import { postUser } from '../controllers/excelfile';
import multer from 'multer';

const upload = multer({ dest: './tmp/' })
const router = Router();

router.post('/',upload.array('files'),postUser);

export default router;