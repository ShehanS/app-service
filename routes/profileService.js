const Profile = require('../model/profile');
const ProfileLike = require('../model/like');
const Image = require('../model/image');
const router = require('express').Router();
const fs = require('fs');

router.post('/register-profile', async (req, res) =>{
    const newProfile = new Profile(req.body);
    console.log(newProfile);
    try{
        const savedProfile = await newProfile.save();
        res.send({profile_id : newProfile._id});
    }catch(err){
        res.status(400).send(err);

    }
});

router.get('/proposed-profiles', async (req, res) =>{
 const profile = Profile;
 const allProfiles = await  profile.find();
 res.json(allProfiles);
});

router.post('/proposed-profiles/:id/like', async (req, res) =>{
    const likeProfile = new ProfileLike(req.body);
    console.log(likeProfile);
    try{
        const like = await likeProfile.save();
        res.send({profile_id : likeProfile._id});
    }catch(err){
        res.status(400).send(err);

    }
});

router.post('/proposed-profiles/:id/dislike', async (req, res) =>{
    const likeProfile = new ProfileLike(req.body);
    console.log(likeProfile);
    try{
        const like = await likeProfile.save();
        res.send({profile_id : likeProfile._id});
    }catch(err){
        res.status(400).send(err);

    }
});

router.post('/proposed-profiles/:id/image', async (req, res) =>{
    const likeProfile = new ProfileLike(req.body);
    console.log(likeProfile);
    try{
        const like = await likeProfile.save();
        res.send({profile_id : likeProfile._id});
    }catch(err){
        res.status(400).send(err);

    }
});

router.get('/proposed-profiles/images/:id', async (req, res) =>{
    const imageGallery = Image;
    const images = await  imageGallery.find();
    res.json(images);
});

router.post('/proposed-profiles/gallery/:id', async (req, res) => {
    const profileImageGallery = new Image({
        id: req.params.id,
        picture_path: req.body.picture_path
    })
    console.log(profileImageGallery);
    try {
        const like = await profileImageGallery.save();
        res.send({image_id: profileImageGallery._id});
    } catch (err) {
        res.status(400).send(err);

    }
});

router.get('/proposed-profiles/gallery/:id', async (req, res) => {
    const query = Image.find({'id': req.params.id});
    console.log(query);
    query.exec((err, image) =>{
        if(err) console.log(err);
        res.json(image);
    })

});



router.get('/proposed-profiles/image/:path', async (req, res) => {
    const imagePath = req.params.path;
    await fs.readFile(`./images/${imagePath}`,(err, data) =>{
        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(data)
    });

});



module.exports = router;