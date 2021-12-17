// Exercices de mises à jour

// db.collection.update(query, update, options)
db.collection.update(query, update, options)
// Reprendre la base paris
use paris
// On ajoute un champ 'acces_handicape' à true aux piscines du 13ème
db.piscines.updateMany(
    {zipCode:75013},    //query
    { $set : { acces_handicape : true}}
)
db.piscines.count({zipCode: 75013})
db.piscines.find({zipCode: 75013})

// Par défaut update() ne modifie que le premier élément qui matche

//Il faut ajouter l'option multi:true pour que la mise à jour se fasse pour tous les enregistrements

// On peut aussi la méthode updateMany() pour obtenir le même résultat


// L'option upsert : true ajoute un document si aucun document ne correspond ou modifie si un document correspond. C'est la contraction de update or insert
db.piscines.updateMany(
    {zipCode:75035},    //query
    { $set : { acces_handicape : true}}, //update
    {upsert: true}
)


// On peut définir des champs et en supprimer dans la meme requete
// Ajouter pour toutes les piscines un champ verif true et supprimer l'accès handicapé
db.piscines.updateMany(
    {zipCode:75013},    //query
    { $unset : { acces_handicape : "blablabla"}}, //update
    {upsert: {verif : true}}
) // update

// Pour vérifier
db.piscines.find({zipCode: 75013})