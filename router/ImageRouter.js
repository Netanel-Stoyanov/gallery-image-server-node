const express = require('express');
const galleryBl = require('../module/GalleryBl');
const loginFilter = require('../filter/LoginFilter');
const router = express.Router();


router.route('/')
    .get(loginFilter.verifyJwt, async (req, res) => {
        const userId = req.userId;
        try {
            const images = await galleryBl.getAllImageByUserId(userId);
            res.json(images);
        } catch (e) {
            console.log(e);
        }
    });

router.route('/:id')
    .get(loginFilter.verifyJwt, async (req, res) => {
        const imageId = req.params.id;
        const userId = req.userId;
        try {
            const image = await galleryBl.getOneImage(imageId, userId);
            res.status(200).send(image);
        } catch (e) {
            console.log(e);
        }
    });

router.route('/')
    .post(loginFilter.verifyJwt, async (req, res) => {
        const userId = req.userId;
        const newImage = req.body;
        try {
            let data = await galleryBl.addImage(newImage, userId);
            res.send(data).status(200);
        } catch (e) {
            console.log(e);
        }

    })

router.route('/:id')
    .delete(loginFilter.verifyJwt, async (req, res) => {
        const userId = req.userId;
        const imageId = req.params.id;
        try {
            const status = await galleryBl.deleteImage(userId, imageId);
            res.status(200).send(status);
        } catch (e) {
            console.log(e);
        }

    })

router.route('/:id')
    .put(loginFilter.verifyJwt, async (req, res) => {
        const imgId = req.params.id;
        const userId = req.userId;
        const img = req.body;
        try {
            const status = await galleryBl.updateImage(userId, img, imgId);
            res.status(200).send(status);
        } catch (e) {
            console.log(e);
        }
    })


module.exports = router;
