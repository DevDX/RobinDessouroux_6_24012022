const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const User = require('../models/User');

/* partie joi pour email */
const Joi = require('joi');
// const { validate } = require('../models/User');
// const validation = joi.object({  
//     email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim(true).required() 
// });
//.pattern(new RegExp(/\A(\S+)@(.+)\.(\S+)\z/))
// if (validation.validate(req.body).error) {
//     res.send(validation.validate(req.body).error.details);
//   };
// const { error } = validation.validate();
// 	if (error) {
// 		res.status(406);
// 		return res.json(
// 			errorFunction(true, `Error in : ${error.message}`)
// 		);
// 	} 
// validation.validate({});
// try{
//     console.log('validation email OK' +validation.email);
// }
// catch (err) { console.log('validation email not OK '+err); };


/**/
/*backup avant Joi
exports.signup = (req, res, next) => {
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
};
fin backup avant Joi */

// Joi ici 
// exports.signup = (req, res, next) => {

//     const validation = joi.object().keys({  
//         //email: joi.string().trim().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required() 
//         email: joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/).required
//     })
//     if (validation.validate(req.body).error){
//             // return res.status(401).json({ error: 'email incorrect !' })  
//             // res.send(validation.validate(req.body).error.details)  
//             return res.status(401).json({ error: 'email incorrect !'})               
//     }
//     else
//     {
//         bcrypt.hash(req.body.password, 10)
//                 .then(hash => {
//                     const user = new User({
//                         email: req.body.email,
//                         password: hash
//                     });
//                     user.save()
//                     .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//                     .catch(error => res.status(400).json({ error }));
//                 })
//                 .catch(error => res.status(500).json({ error })); 

//     }
// };   
// autre essai
// exports.signup = (req, res, next) => {

//     const validation = joi.object().keys({  
//         //email: joi.string().trim().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required() 
//         email: joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/).required
//     })
//     if (validation.validate()){
           
//         bcrypt.hash(req.body.password, 10)
//                 .then(hash => {
//                     const user = new User({
//                         email: req.body.email,
//                         password: hash
//                     });
//                     user.save()
//                     .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//                     .catch(error => res.status(400).json({ error }));
//                 })
//                 .catch(error => res.status(500).json({ error })); 

//     }
//     else
//         {
//            return res.status(401).json({ error: 'email incorrect !'})       
//         }
// };   
// autre tentative 
// exports.signup = (req, res, next) => {

//         const schema = Joi.object().keys({  
//             //email: joi.string().trim().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required() 
//             email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required
//         })
//         if (schema.validate(req.body).error)
//         {   //return res.status(401).json({ error: 'email incorrect !'})   
//             res.send(schema.validate(req.body).error.details)  ;

//         }
//         else
//         {
//             bcrypt.hash(req.body.password, 10)
//                 .then(hash => {
//                                 const user = new User({
//                                     email: req.body.email,
//                                     password: hash
//                                 });
//                                 user.save()
//                                 .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//                                 .catch(error => res.status(400).json({ error }));
//                             })
//                 .catch(error => res.status(500).json({ error }));   
//         } 
// };
// autre tentative trouvée sur le net
// exports.signup = (req, res, next) => {
// var schema = Joi.object().keys({
//     // firstName: Joi.string().min(5).max(10).required().error(new Error('Give your error message here for first name')),
//     // lastName: Joi.string().min(5).max(10).required().error(new Error('Give your error message here for last name')),
//     email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().error(new Error('email incorrect !'))
//   });
  
//   Joi.validate(req.body ,schema, function(err, value) {
//     if (err) {
//       console.log(err.message)
//       return catched(err.message); 
//     }
//     else
//     {
//         bcrypt.hash(req.body.password, 10)
//                         .then(hash => {
//                                         const user = new User({
//                                             email: req.body.email,
//                                             password: hash
//                                         });
//                                         user.save()
//                                         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//                                         .catch(error => res.status(400).json({ error }));
//                                     })
//                         .catch(error => res.status(500).json({ error }));      
//     }
//   })
// };
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