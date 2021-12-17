/* Les opérateurs de requête */

// Dans la collection "piscines" de la base "paris", trouver en utilisant les opérateurs de requête
// https://docs.mongodb.com/manual/reference/operator/

// les piscines qui sont dans le 13e arrondissement

db.piscines.find({ zipCode : 75013 })
// est en fait la requête 
db.piscines.find({ zipCode : { $eq : 75013 }})

// les piscines qui ne sont pas le 13e arrondissement
// opérateur not equal : $ne
db.piscines.find({ zipCode : { $ne : 75013 }})

// En affichant uniquement le nom des piscines qui ne sont pas dans le 13eme
db.piscines.find(
    { zipCode : { $ne : 75013 }},       // query
    { name:1, _id:0}                    // projection
)

// En affichant uniquement le nom de toutes les piscines
db.piscines.find(
    { },                 // query
    { name:1, _id:0}     // projection
)

// les piscines qui sont soit dans le 13e , soit dans le 14e arrondissement

// Soit avec un $or
db.piscines.find(
    { 
        $or : [
                { zipCode : { $eq : 75013 }},                 
                { zipCode : { $eq : 75014 }}
            ]
    }
)
// Équivalent à
db.piscines.find(
    { 
        $or : [
                { zipCode : 75013 },                 
                { zipCode : 75014 }
            ]
    }
)
// Soit avec un $in
db.piscines.find({ zipCode : { $in : [ 75013, 75014 ]}})

db.piscines.find({ zipCode : { $in : [ 75013, 75014 ]}}).pretty()
// les piscines qui ne sont pas dans le 15, 16, 17 et 18e arrondissement
db.piscines.find({ zipCode : { $nin : [ 75015, 75016, 75017, 75018 ]}})

// En triant par code postal descendant:

// Dans mongo un sort ascendant se fait avec {champ : 1}
// un sort descendant avec { champ : -1 }
db.piscines.find(
    { zipCode : { $nin : [ 75015, 75016, 75017, 75018 ]}},  //query
    { zipCode: 1, name: 1, _id:0}                           //projection
).sort({zipCode: -1})
// les piscines dont le code postal est supérieur ou égal à 75013 triés par code postal descendant

db.piscines.find({ zipCode : { $gte : 75013} }).sort({zipCode: -1})

// Les piscines situées à l'ouest de Notre Dame de Paris
// Coordonnés de Notre Dame : longitude : 2,35 / latitude : 48,853
// A l'ouest = dont la longitude est inférieure à 2,35
db.piscines.find({ lon : { $lt : 2.35} })

// Et leur nombre
db.piscines.count({ lon : { $lt : 2.35} })


// Les piscines dont zipCode=75013 ET id=2929 avec l'opérateur $and et $eq
db.piscines.find({ 
    $and : 
        [
            { zipCode: { $eq : 75013 }},      
            { id : { $eq : 2929 }} 
        ]
})
// On peut simplifier - uniquement l'opérateur $and
db.piscines.find({ 
    $and : 
        [
            { zipCode : 75013 },      
            { id : 2929 } 
        ]
})
// Version la plus courte
db.piscines.find({ zipCode : 75013 , id : 2929 })