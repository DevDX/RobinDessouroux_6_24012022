const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const User = require('../models/User');

/* partie joi pour email */
const Joi = require('joi');


// version stackoverflow
exports.signup = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),//.error(new Error('email incorrect !')),
        password: Joi.string().required()
    })
      
// const { value, error } = schema.validate(req.body);
if(schema.validate(req.body).error){ res.send(schema.validate(req.body).error.details); }
else {
      //console.log(value);
      //res.send("email ok selon stackoverflow");
      bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                                        const user = new User({
                                            email: req.body.email,
                                            password: hash
                                        });
                                        user.save()
                                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                                        .catch(error => res.status(400).json({ error }));
                                    })
                        .catch(error => res.status(500).json({ error }));      
    }
};
// Joi fin 


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error : 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error : 'Mot de passe incorrect !' });   
            }
            res.status(200).json({
                userId: user._id,
                //token: 'TOKEN' remplacé par la fonction sign
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET', // <= écran ou cours => RANDOM_SECRET_KEY ? 
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};