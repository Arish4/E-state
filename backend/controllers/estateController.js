const Estate = require('../models/estate');

// Upload single estate
const uploadEstate = async (req, res) => {
    try {
        const { name, price, location, description } = req.body;

        // Ensure user is seller
        if (req.user.role !== 'seller') 
            return res.status(403).json({ error: 'Unauthorized' });

        // Check if image is provided
        if (!req.file) 
            return res.status(400).json({ error: 'At least 1 image is required' });

        // Create URL for uploaded image
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        // Create new estate
        const newEstate = await Estate.create({
            name,
            owner: req.user.id,
            price,
            location,
            description,
            image: imageUrl // single image
        });

        res.status(201).json(newEstate);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all estates (for buyers)
const getAllEstates = async (req, res) => {
    try {
        if (req.user.role !== 'buyer') 
            return res.status(403).json({ error: 'Unauthorized' });

        const estates = await Estate.find().sort({ price: -1 });
        res.status(200).json(estates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get estates of logged-in seller
const getMyEstates = async (req, res) => {
    try {
        if (req.user.role !== 'seller') 
            return res.status(403).json({ error: 'Unauthorized' });

        const estates = await Estate.find({ owner: req.user.id }).sort({ price: -1 });
        res.status(200).json(estates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update estate
const updateEstate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, location, description, status } = req.body;

        const estate = await Estate.findById(id);
        if (!estate) return res.status(404).json({ error: 'Estate not found' });
        if (estate.owner.toString() !== req.user.id) 
            return res.status(403).json({ error: 'Unauthorized' });

        // Update normal fields
        estate.name = name || estate.name;
        estate.price = price || estate.price;
        estate.location = location || estate.location;
        estate.description = description || estate.description;
        estate.status = status || estate.status;

        // Update image if new one is uploaded
        if (req.file) {
            estate.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const updatedEstate = await estate.save();
        res.status(200).json(updatedEstate);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Search estates
const searchEstates = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ error: 'Search query is required' });

        const regex = new RegExp(query, 'i');
        const estates = await Estate.find({
            $or: [
                { name: regex },
                { location: regex },
                { description: regex }
            ]
        });

        res.status(200).json(estates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    uploadEstate,
    getAllEstates,
    getMyEstates,
    updateEstate,
    searchEstates
};
