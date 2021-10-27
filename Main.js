const express = require('express');
const userRouter = require('./router/UserRouter');
const galleryRouter = require('./router/ImageRouter');
const cors = require('cors');
require('dotenv').config()
const app = express();

require('./config/GalleryDbConfig');

app.use(express.json());
app.use(cors());
app.use('/gallery', galleryRouter);
app.use('/gallery/user', userRouter);

app.listen(8089);
