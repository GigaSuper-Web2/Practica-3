const express = require('express');
const User = require('./user'); // Importa el modelo de usuario
const router = express.Router();

// Ruta para obtener usuarios
router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ data: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para agregar un usuario
router.post('/add', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: 'Usuario creado', data: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para editar un usuario
router.put('/edit/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario actualizado', data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para eliminar un usuario
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado', data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
