const jwt = require('jsonwebtoken');

console.log("ici auth.js ligne2");//test en dev

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = { userId }; // c'est comme un check de l'utilisateur
    if (req.body.userId && req.body.userId !== userId) {  // il faut qu'il y ait un userid et qu'il soit celui lu dans la DB
      throw 'User ID non valable !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error('Invalid request!')
    });
  }
};