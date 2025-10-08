const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {
     uploadEstate,
    getAllEstates,
    getMyEstates,
    updateEstate,
    searchEstates
} = require('../controllers/estateController');
const { authenticate } = require('../middleware/authMiddleware');

// Routes
router.post('/upload', authenticate, upload.single('image'), uploadEstate);
router.get('/all', authenticate, getAllEstates);
router.get('/my', authenticate, getMyEstates);
router.put('/update/:id', authenticate, upload.single('image'), updateEstate);
router.get('/search', authenticate, searchEstates);

module.exports = router;
