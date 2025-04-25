import express, { Router } from 'express';
import trimRequest from "ts-trim-request"
const router: Router = express.Router();

import * as controller from '../controllers/report.controller';
router.get('/', controller.showReport);
// router.post('/accept-reject-request', trimRequest.all, controller.AccRejcetReq);
// router.post('/remove-friend', trimRequest.all, controller.RemoveFriend);
// router.post('/cancel-request', trimRequest.all, controller.CancelReq);

// router.get('/get-requests', trimRequest.all, controller.GetReq);
// router.get('/get-friends', trimRequest.all, controller.GetFriends);
// router.get('/get-sent-requests', trimRequest.all, controller.GetSentReq);

export default router;