const express = require('express');
const connectDB = require('./config/database');
const mahasiswaRoutes = require('./routes/mahasiswa');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/mahasiswa', mahasiswaRoutes);
app.use((error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({
      message: `Data dengan ${Object.keys(error.keyPattern).join(', ')} tersebut sudah digunakan`,
    });
  }

  if (error instanceof require('mongoose').Error.ValidationError) {
    return res.status(400).json({
      message: 'Validasi data gagal',
      errors: Object.values(error.errors).map((item) => item.message),
    });
  }

  console.error(error);
  return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Gagal menjalankan server:', error.message);
    process.exit(1);
  });
}

module.exports = app;

