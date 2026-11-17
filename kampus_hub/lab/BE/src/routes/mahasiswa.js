const express = require('express');
const mongoose = require('mongoose');
const Mahasiswa = require('../models/Mahasiswa');

const router = express.Router();

router.get('/', async (req, res) => {
  const mahasiswa = await Mahasiswa.find().sort({ nama: 1 });
  res.json(mahasiswa);
});

router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'ID mahasiswa tidak valid' });
  }

  const mahasiswa = await Mahasiswa.findById(req.params.id);
  if (!mahasiswa) {
    return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
  }

  return res.json(mahasiswa);
});

router.post('/', async (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Body request harus berupa object JSON' });
  }
  console.log(req.body);

  const mahasiswa = await Mahasiswa.create(req.body);
  return res.status(201).json({mahasiswa, message: "data berhasil ditambahkan"});
});

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'ID mahasiswa tidak valid' });
  }
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Body request harus berupa object JSON' });
  }

  const mahasiswa = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!mahasiswa) {
    return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
  }

  return res.json(mahasiswa);
});

router.delete('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'ID mahasiswa tidak valid' });
  }

  const mahasiswa = await Mahasiswa.findByIdAndDelete(req.params.id);
  if (!mahasiswa) {
    return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
  }

  return res.json({ message: 'Data mahasiswa berhasil dihapus', data: mahasiswa });
});

module.exports = router;