// Importer dans une base us, dans la collection companies le fichier companies.json
mongoimport -d us -c companies --file ".\Données\companies.json" 
// Quelle est la société la plus ancienne ?
use us



// Quelle est la société qui emploie le plus de personnes ?


// Quelle est la société qui emploie le plus de personnes dans la publicité (advertising) ?


// Quel est l'effectif cumulé des entreprises de 'network_hosting' ?
// => aggregate !


// Quelle entreprise est dirigé par Rich Langdale ?


// relationships.person est un tableau . Lors d'un find, mongo va parcourir tous les index de ce tableau


// Supprimer les entreprises de finance

// Mettre à jour les entreprises de publicité en leur ajoutant un champ 'likes'

// Créer un index sur le champ nom de la compagnie
db.companies.getIndexes() // Pour obtenir la liste actuelles des indexes de la collection


// Recréer l'index en spécifiant que la valeur doit être unique

// Cela déclenche une erreur : mongo ne peut pas créer l'index unique car il y a des doublons dans le nom des entreprises

// Insérer une société My Little Compagnie en respectant l'organisation actuelle de la base

// Trouver les sociétés qui ont un bureau situé à moins de 20 kilomètres de la statue de la Liberté

// Stocker les coordonnées du premier bureau de chaque entreprise sous la forme d'un objet GEOJson

// On va devoir manipuler un curseur pour faire cette modification

// Puis quitter le shell mongo et ré-importer nos données 

// On s'assure que toutes les entreprises aient un champ coordinates

// On ajoute un index 2dsphere à notre collection companies

// On peut maintenant faire notre requete de proximité

// Je stockes les coordonées de la Statue de la Liberté

// Je fais ma requete 

// Ajouter un champ phone dans l'adresse du premier bureau des sociétés qui sont situées dans l'état de NY

// Créer une autre collection 'awards', créer quelques récompenses (ca doit etre des entiers) en les reliant à une société en utilisant une référence

// Créer une fonction qui prend en paramètre un _id et qui calcule la moyenne des awards d'une entreprise

// Pour chercher une company par son _id

// Pour chercher les awards grâce à l'id d'une company :

// Ma fonction de calcul de la moyenne des awards 

// Ajouter quelques likes dans un tableau et tester votre fonction
