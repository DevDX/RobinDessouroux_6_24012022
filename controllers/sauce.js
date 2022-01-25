const Sauce = require('../models/Thing');
const fs = require('fs');
console.log("ok passé ici sauce.js ligne 3");
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
		.catch(error => res.status(500).json({ error })); //pour la partie 4
  };

  // exports.getOneSauce = (req, res, next) => {
  //   Sauce.findOne({ _id: req.params.id })
  //     .then(Sauce => res.status(200).json({ sauce: Sauce }))
  //     .catch(error => res.status(404).json({ error }));
  // };

  exports.getOneSauce = (req, res, next) => {
       Sauce.findOne({ _id: req.params.id })
         .then((sauce) => { res.status(200).json(sauce);})
         .catch((error) => { res.status(404).json({ error: error });});
  };

  // exports.getAllSauces = (req, res, next) => {
  //   Sauce.find()
  //     .then(Sauce => res.status(200).json({ sauces: Sauce}))
  //     .catch(error => res.status(400).json({ error }));
  // };

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