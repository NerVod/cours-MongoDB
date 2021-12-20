/* Les restaurants de NewYork */

// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurant.json
// sur PC : Si le dossier des outils d emongo n'est pas dans le $PATH, il faut se mettre dans le dossier où il y l'executable mongoimport

mongoimport --db newyork --collection restaurants --file "Données\restaurants.json"

use newyork
// Combien y a-t-il de restaurants ?
db.restaurants.countDocuments()
// Identique à
db.restaurants.find().count()
// Trouver les restaurants qui sont dans la rue "Morris Park Ave"
db.restaurants.find({ "address.street" : "Morris Park Ave"})
db.restaurants.find({ "address.street" : "Morris Park Ave"}).count() // 9
// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"
db.restaurants.find({ "address.street" : "Morris Park Avenue"}).count() // 27 

// L'utilisation d'une regex permet de récupérer les 2 orthographes (et éventuellement les orthographes alternatives en minuscules avec le flag i(nsensitive) )
db.restaurants.find({ "address.street" : /morris park ave/i}).count()

// En utilisant l'opérateur $regex explicite, cela donne : 
db.restaurants.find({ "address.street" : { $regex : /morris park ave/i } }).count()
// Afficher uniquement (sans l'id) les champs quartier, type de cuisine et adresse
db.restaurants.find(
    { "address.street" : /morris park ave/i},           // query
    { _id : 0, borough : 1, cuisine : 1, address : 1 })   // projection

// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie. (Hamburgers OR Bakery )
// Avec un $or
db.restaurants.find({
    $and : [
                { borough : "Staten Island"},
                {
                    $or : 
                    [
                        { cuisine : "Bakery"},
                        { cuisine : "Hamburgers"}    
                    ]
                }
    ]
})

// Avec le $and implicite
db.restaurants.find(
    { 
    borough : "Staten Island",
    $or : 
        [
            { cuisine : "Bakery" },
            { cuisine : "Hamburgers" }    
        ]
    }
)

// Avec un $in
db.restaurants.find(
    { 
    borough : "Staten Island",
    cuisine : { $in : [ "Bakery", "Hamburgers"] }    
    }
)

// La variable restaurants est un objet. Dans mongo, ils appellent cela un curseur...
var allRestaurants = db.restaurants.find().limit(10)
// Parcours d'un curseur avec un while
while(allRestaurants.hasNext()){
    printjson(allRestaurants.next());
    // Pour afficher uniquement un des champs de l'objet
    // print(allRestaurants.next().name);
}

// Parcours d'un curseur avec un foreach
var allRestaurants = db.restaurants.find().limit(10)
allRestaurants.forEach( oneRestaurant =>{
    print(oneRestaurant.name);
})

// Quel est le type de restaurant le plus présent ?
// Vous pouvez le faire en vanillaJS
var allRestaurants = db.restaurants.find();
var allCuisines = [];

allRestaurants.forEach( oneRestaurant =>{
    // Si la cuisine de ce restaurant n'est pas dans le tableau allCuisines
    if( allCuisines.indexOf(oneRestaurant.cuisine) == -1){
        // Alors je l'ajoute
        allCuisines.push(oneRestaurant.cuisine);
    }
})

var maxCuisine = "";
var nbOccurencesCuisine = 0;

// Je parcours maintenant mon tableau allCuisines
allCuisines.forEach(oneCuisine =>{
    // Si le nombre de restaurants qui ont cette cuisine est supérieur à ma variable nbOccurencesCuisines
    if ( db.restaurants.countDocuments({ cuisine : oneCuisine }) > nbOccurencesCuisine ){
        // Alors nbOccurencesCuisine est égal au nbre d'occurences de cette cuisines
        nbOccurencesCuisine =  db.restaurants.countDocuments({ cuisine : oneCuisine });
        maxCuisine = oneCuisine;
    }
})
// Autre méthode. Plus élégante ??
// C'est le pipeline d'aggregation

db.restaurants.aggregate([
    // Etape 1
    // Sélectionner les documents que l'on souhaite regrouper
    { $match : { } }, // L'objet requete {} permet de sélectionner tous les documents

    // Etape 2 (récupère le résultat de l'Etape 1)
    // Regrouper nos documents sélectionnés :
    // Cette étape crée une collection temporaire
    { $group :  { _id : "$cuisine", nbRestos : {  $sum : 1 } }},

    // Etape 3 (récupère le résultat de l'Etape 2)
    // Trier les résultats  // -1 = décroissant ; 1 = croissant
    { $sort : { nbRestos : -1 }},
    // Etape 4
    // Limiter l'affichage
    { $limit : 1 }
    // Il y autant d'étapes que nécessaires
])

// Pour limiter aux restos de Staten Island
db.restaurants.aggregate([
    { $match : { borough : "Staten Island" } }, 
    { $group :  { _id : "$cuisine", nbRestos : {  $sum : 1 } }},
    { $sort : { nbRestos : -1 }},
    { $limit : 1 }
])