const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema(
  {
    nim: {
      type: String,
      required: [true, 'NIM wajib diisi'],
      unique: true,
      trim: true,
    },
    nama: {
      type: String,
      required: [true, 'Nama wajib diisi'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    jurusan: {
      type: String,
      required: [true, 'Jurusan wajib diisi'],
      trim: true,
    },
    angkatan: {
      type: Number,
      required: [true, 'Angkatan wajib diisi'],
      min: [1900, 'Angkatan tidak valid'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);