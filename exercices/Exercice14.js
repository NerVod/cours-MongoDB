// Par défaut, mongo est accessible sans authentification
// Dans un environnement de production, il faut mettre en place cette sécurité !!

use base_protegee
//On créé un  utilisateur et on lui donne un rôle ( = des droits )
db.createUser(
    {
      user: "username",
      pwd: "username",
      roles: [
         { role: "readWrite", db: "base_protegee" },
      ]
    }
)

// Il faut redémarrer le serveur mongod avec le paramètre --auth pour activer l'authentification
Comme notre serveur mongod est démarré automatiquement au démarrage par un service. Il faut arrêter le service pour pouvoir relancer le serveur mongo ( démarrer => services.msc => MongoDB Serveur => Stop )
Puis en se mettant dans le dossier des binaires (c:\devjs\mongodb\bin ) 
mongod --auth --dbpath c:\devjs\mongodb\data

// Dans un terminal en administrateur : 
mongod --dbPath "C:\ProgramData\MongoDB\data\db" --auth


// Reconnectez-vous au client mongo et essayez d'insérer un enregistrement
mongo --authenticationDatabase "base_protegee" -u "username" -p

// On peut aussi s'authentifier après la connexion 
use base_protegee
db.auth("username", passwordPrompt()) 
// On vous le refuse car vous n'avez pas les droits.

