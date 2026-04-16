const User = require('../models/userModel');

// GET / getAllUsers - Mengambil daftar semua user
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// GET /:id getUserById - Mengambil detail user berdasarkan ID unik
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// POST / createUser - Menambah data user baru
const createUser = async (req, res) => {
    try {
        const { nama, email, password } = req.body;
        
        // Simple validation
        if (!nama || !email || !password) {
            return res.status(400).json({ success: false, message: 'Nama, email, and password are required' });
        }

        const newUser = await User.create({ nama, email, password });
        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        // Handle duplicate email error from MongoDB (code 11000)
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// PUT /:id updateUser - Memperbarui seluruh data user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // returns the updated document
            runValidators: true // runs schema validation
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// DELETE /:id deleteUser - Menghapus user berdasarkan ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: {}
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
