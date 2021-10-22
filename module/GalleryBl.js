const GallerySchema = require('./ImageSchema');

const getAllImageByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        GallerySchema.find({user_id: userId}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const getOneImage = (id, userId) => {
    return new Promise((resolve, reject) => {
        GallerySchema.findOne({_id: id, user_id: userId}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const addImage = (img, user_id) => {
    return new Promise((resolve, reject) => {
        const newImage = new GallerySchema({
            title: img.title,
            description: img.description,
            url: img.url,
            user_id: user_id
        })

        newImage.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve(newImage);
            }
        })

    })
}

const deleteImage = (userId, imageId) => {
    return new Promise((resolve, reject) => {
        GallerySchema.findOneAndDelete({user_id: userId, _id: imageId},
            (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
    })
}

const updateImage = (user_id, img, id) => {
    return new Promise((resolve, reject) => {
        const updatedImage = {
            title: img.title,
            description: img.description,
            url: img.url,
            user_id: user_id
        }
        GallerySchema.findByIdAndUpdate(id, updatedImage, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("updated");
            }
        })
    })
}

module.exports = {getAllImageByUserId, getOneImage, addImage, deleteImage, updateImage};
