Ce projet doit contenir deux dossiers; backend et frontend.
Ces deux dossiers doivent se trouver au même niveau dans l'arborescence du projet.
racine: Projet_P6
dossier: backend
dossier: frontend

Dossier backend:
---------------
Le contenu de github correspond au dossier backend.
Il faut créer le dossier backend.
Il faut exécuter depuis un terminal dans le dossier backend :
npm install
puis les dépendances contenues dans le package.json :
"dependencies": {
    "bcrypt": "^5.0.1",
    "dotenv": "^14.3.2",
    "express": "^4.17.2",
    "helmet": "^5.0.2",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.1.7",
    "mongoose-unique-validator": "^3.0.0",
    "multer": "^1.4.4",
    "password-validator": "^5.2.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }

Pour lancer le backend saisir 
nodemon server ou   node server.js
Il faut un fichier .env pour se connecter à MongoDB.
Volontairement, Il ne figure pas dans GitHub. 


Dossier frontend:
----------------
Le fichier frontend.zip y figure aussi.
Il correspond  au dossier frontend. Il faut le décompresser afin de créer ce dossier.
Il faut exécuter depuis un terminal dans le dossier frontend :  
npm install
npm install --save-dev run-script-os
Puis npm run start lancera le frontend.



 
