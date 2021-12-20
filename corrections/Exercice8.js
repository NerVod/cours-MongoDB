// Exercices de mises à jour

// db.collection.update(query, update, options)
db.collection.update(query, update, options)
// Reprendre la base paris
use paris
// On ajoute un champ 'acces_handicape' à true aux piscines du 13ème
db.piscines.update(
    { zipCode : 75013},                     // query 
    { $set : { acces_handicape :  true }},  // update
)
db.piscines.count({zipCode: 75013})

// Par défaut update() ne modifie que le premier élément qui matche


// On peut aussi la méthode updateMany() pour obtenir le même résultat
db.piscines.updateMany(
    { zipCode : 75013},                     // query 
    { $set : { acces_handicape :  true }},  // update
)
// L'option upsert : true ajoute un document si aucun document ne correspond ou modifie si un document correspond. C'est la contraction de update or insert
db.piscines.updateMany(
    { zipCode : 75035},                     // query 
    { $set : { acces_handicape :  true }},  // update
    { upsert: true } // upsert = UPdate or inSERT : si aucun document ne correspond à la recherche, alors on en crée un 
)
// On peut définir des champs et en supprimer dans la meme requete
// Ajouter pour toutes les piscines un champ verif true et supprimer l'accès handicapé
db.piscines.updateMany(
    { zipCode : 75013},                     // query 
    { 
        $unset : { acces_handicape :  "blalabla" },
        $set : { verif : true}
    } // update
    
)

// Pour vérifier
db.piscines.find({zipCode: 75013})