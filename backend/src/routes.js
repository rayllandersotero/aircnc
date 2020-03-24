const express = require('express');
const multer = require('multer');
const UploadConfig = require('./config/uploads');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const router = express.Router();
const upload = multer(UploadConfig);

router.post('/sessions', SessionController.store);

router.get('/spots', SpotController.index);
router.post('/spots', upload.single('thumbnail'), SpotController.store);

router.get('/dashboard', DashboardController.show);

router.post('/spots/:spot_id/booking', BookingController.store);

router.post('/bookings/:booking_id/approvals', ApprovalController.store);
router.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = router;
