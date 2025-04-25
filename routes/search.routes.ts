import express, { Router } from 'express';
import trimRequest from "ts-trim-request"
const router: Router = express.Router();

import * as controller from '../controllers/search.controller';

router.get('/', controller.showDashBoard);
export default router;