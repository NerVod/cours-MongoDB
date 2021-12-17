/* Les restaurants de NewYork */
mongoimport --db newyork --collection restaurants --file "C:\Users\Stagiaire\Documents\cours-MongoDB\restaurants.json"

// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurant.json
// sur PC : Se mettre dans le dossier où il y l'executable mongoimport
db.restaurants.countDocuments()
// Combien y a-t-il de restaurants ?

25359
// Identique à
db.restaurants.find().count()
// Trouver les restaurants qui sont dans la rue "Morris Park Ave"
db.restaurants.find({"address.street" : "Morris Park Ave"})
db.restaurants.find({"address.street" : "Morris Park Ave"}).count() //9

// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"
db.restaurants.find({"address.street" : "Morris Park Avenue"}).count() //27

// L'utilisation d'une regex permet de récupérer les 2 orthographes (et éventuellement les orthographes alternatives en minuscules avec le flag i(nsensitive) )
db.restaurants.find({"address.street" : /Morris Park Ave/i}).count() 

// Afficher uniquement (sans l'id) les champs quartier, type de cuisine et adresse
db.restaurants.find(
    {"address.street" : /Morris Park Ave/i},
    {_id :0, borough: 1, cuisine: 1, address :1 }  
)

// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie.(Hamburgers OR Bakery)
// Avec un $or
db.restaurants.find({
    $and: [
        {borough : "Staten Island"},
        {$or:[
            {cuisine: "Hamburgers"},
            {cuisine: "Bakery"}
        ]}
    ]
});

// Avec le $and implicite
db.restaurants.find(
    {    
    borough : "Staten Island",
    $or:[
        {cuisine: "Hamburgers"},
        {cuisine: "Bakery"}
    ]    
})

// Avec un $in
db.restaurants.find(
    {
        borough : "Staten Island",
        cuisine : { $in : [ "Bakery", "Hamburgers"] }
    }
);

// La variable restaurants est un objet. Dans mongo, ils appellent cela un curseur...
var allRestaurants = db.restaurants.find().limit(10);
// Parcours d'un curseur avec un while
while(allRestaurants.hasNext()){
    printjson(allRestaurants.next())


// Parcours d'un curseur avec un foreach
var allRestaurants = db.restaurants.find().limit(10);
allRestaurants.forEach( oneRestaurant =>{
    print(oneRestaurant.name)
})
// Quel est le type de restaurant le plus présent ?
// Vous pouvez le faire en vanillaJS
var allRestaurants = db.restaurants.find().limit(10);
var allCuisines = [];

allRestaurants.forEach( oneRestaurant =>{
    // si la cuisine n'est pas dans le tableau AllCuisine
    if(allCuisines.indexOf(oneRestaurant.cuisine) == -1){
        // alors on l'ajoute
        allCuisines.push(oneRestaurant.cuisine);
    }
});

var maxCuisine = "";
var nbOccurenceCuisine = 0;
//Je parcours maintenant mon tableau allCuisine
allCuisines.forEach(oneCuisine =>{
    //si le nombre d'occurence de cette cuisine est supérieur à ma variable 
    // nbOccurenceCuisines
    if (db.restaurants.countDocuments({cuisine : oneCuisine}) > nbOccurenceCuisine) {
        //Alors nbOccurenceCuisine est égal au nbre d'occurences de cette cuisine
        nbOccurenceCuisine = db.restaurants.documents({cuisine : oneCuisine});
        maxCuisine = OneCuisine;
    }
})



// Autre méthode. Plus élégante ??
// C'est le pipeline d'aggregation
db.restaurants.aggregate([
    //etape1
    //sélectionner les documents que l'on souhaite regrouper:
    {$match : {} }, // l'objet requete {} permet de sélectionner tous les documents

    //etape2 (récupère résultat de l'étape 1)
    //regrouper tous les documents sélectionnés
    //cette étape créé une collection temporaire
        // le $cuisine => le $ sert à accéder à la cuisine de tous les restaurants
    { $group: {_id:"$cuisine", nbRestos :{ $sum : 1} }},

    //etape3 (récupère résultat de l'étape 2)
    // trier les résultats
    {$sort: {nbRestos: -1}}, // (-1 pour tri décroissant  / 1 = tri croissant)

    //etape4 ...
    {$limit : 1}
    // Il y a autant d'étapes que nécessaire
])

// Pour limiter aux restos de Staten Island

