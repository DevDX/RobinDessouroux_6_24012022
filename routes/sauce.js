const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.createSauce);  //  création 
router.put('/:id', auth, multer, sauceCtrl.modifySauce);    //  modification
router.get('/:id', auth, sauceCtrl.getOneSauce);    //  afficher une sauce
router.get('/', auth, sauceCtrl.getAllSauces);  // afficher toutes les sauces
router.delete('/:id', auth, sauceCtrl.deleteSauce); // suppression 

router.post('/:id/like', auth, sauceCtrl.likeDislike);   //cas des likes et dislikes

module.exports = router;