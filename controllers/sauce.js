const Sauce = require('../models/Thing');
const fs = require('fs');

//console.log("ok passé ici sauce.js ligne 3");// test en dev

exports.createSauce  = (req, res, next) => { 
  const sauceObject = JSON.parse(req.body.sauce);
  //delete req.body._id;
  delete sauceObject._id;
  const sauce = new Sauce({
    //...req.body,
	...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'})) 
    .catch(error => res.status(400).json({ error }));  
};
  
exports.modifySauce = (req, res, next) => {
  // cas particulier SI NOUVELLE IMAGE alors enlever la précédente - - - - -
  if (req.file) {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) console.log(err);
        else {
          console.log('image précédente retirée ' + filename);
        }
      });
    });
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  

  // Sauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
      });
    })
  .catch(error => res.status(500).json({ error }));  
};



exports.getOneSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => { res.status(200).json(sauce);})
        .catch((error) => { res.status(404).json({ error: error });});
};

  

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

// cas des likes et dislikes
exports.likeDislike = (req, res, next) => { 
  
  switch (req.body.like) {

    // case 1 pour like
    case 1:
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.body.userId }, // $push ajoute une valeur spécifiée à un tableau
          $inc: { likes: +1 } // $inc incrémente un champ d'une valeur spécifiée 
        })
        .then(() => res.status(200).json({ message: 'like +1' }))
        .catch((error) => res.status(400).json({ error }));
      break;

    // case -1 pour dislike
    case -1:
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersDisliked: req.body.userId },  // $push ajoute une valeur spécifiée à un tableau
          $inc: { dislikes: +1 } // $inc incrémente un champ d'une valeur spécifiée 
        })
        .then(() => {
          res.status(200).json({ message: 'dislike +1' })
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    // case 0 décrémentation du like ou du dislike
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.includes(req.body.userId)) { // ici l'utilisateur avait aimé 
            Sauce.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, // $push ajoute une valeur spécifiée à un tableau
                $inc: { likes: -1 } // $inc incrémente un champ d'une valeur spécifiée
              })
              .then(() =>
                res.status(200).json({ message: 'suppression du like' })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(req.body.userId)) {  // ici l'utilisateur n'avait pas aimé 
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },  // $push ajoute une valeur spécifiée à un tableau
                $inc: { dislikes: -1 }, // $inc incrémente un champ d'une valeur spécifiée
              })
              .then(() =>
                res.status(200).json({ message: 'suppression du dislike' })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;

    

    default:
      console.log(error); // vérifier si impératif, présent dans la doc mdn rdx
  }
};

