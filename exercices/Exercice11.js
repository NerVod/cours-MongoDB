// Vélib

// Récupérer un fichier json des velib chez jcdecaux developer
// Importer dans la base paris, le fichier jcdecaux.json dans une collection velib


// Cette fois-ci les données sous fournies sous la forme d'un tableau d'objets, il faut donc ajouter l'option --jsonArray pour importer
mongoimport --db paris --collection velib --file "/Données/jcdecaux.json" --jsonArray
mongoimport --db paris --collection velib --file "C:\Users\Stagiaire\Documents\cours-MongoDB\jcdecaux_velib_paris.json" --jsonArray

 
// Problème ! On n'a pas de champ codepostal ... On retrouve le code postal dans l'adresse.

// Mettez à jour tous les enregistrements en leur ajoutant un champ zipCode

var allStations =db.velib.find().limit(5)

db.velib.find().forEach(oneStation => {
    print (oneStation.address.match(/[0-9]{5}/));
     // renvoi un tableau, pour avoir juste le premier indice :
    print (oneStation.address.match(/[0-9]{5}/)[0]);

    var codepostal = oneStation.address.match(/[0-9]{5}/)[0];

    db.velib.updateOne(
        {_id : oneStation._id },
        {$set : {zipCode : codepostal}}
    )
    
});
   



// Quel est l'arrondissement de Paris où il y a le plus de stations ? (avec un $in)  

db.velib.aggregate([
    {$match : {} },
    {$group : {_id:"$zipCode" , nbreStation:{$sum : 1}} },
    {$sort : {nbreStation : -1}},
    {$limit : 1}
])

db.velib.aggregate([
    {$match :{zipCode : {in : ["75001","75002","75003","75004","75005","75006","75007","75008","75009","75010","75011","75012","75013","75014","75015","75016","75017","75018","75019","75020"]}}},
    {$group: {_id: "$zipCode", nbStations : {$sum: 1} } },
    {$sort : {nbreStation : -1}},
    {$limit : 1}

])


// OU plus élégant 
db.velib.aggregate([

    { $match: {zipCode: /^75/}}, //regex qui selectionne les zipCode commençant par 75
    {$group: {_id :"$zipCode", nbSations : {$sum : 1} } },
    {$sort : {nbreStation : -1}},
    {$limit : 1}
])

// Quelle est la ville (hors Paris) qui a le plus de stations
db.velib.aggregate([
    { $match: {zipCode: /^(?!75)/ } }, //regex qui selectionne les zipCode NE commençant PAS par 75
    {$group: {_id :"$zipCode", nbStations : {$sum : 1} } },
    {$sort : { nbStations : -1}},
    {$limit : 3}
])

// Cherchez la piscine Dunois .
db.piscines.find({name : /dunois/i});
const latDunois = 48.832973;
const lonDunois = 2.366437;

// Quelles sont les 5 stations velib les plus proches de la piscine Dunois ?
// Première version : en utilisant une fonction de calcul de distance
https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
// Ajouter un champ distanceDunois à toutes les stations
const latDunois = 48.832973;
const lonDunois = 2.366437;
distance(latDunois, lonDunois, 48.853, 2.35, "K")

// Cette distance sera égale à la valeur de retour de la fonction distance()

var allStations = db.velib.find()

allStations.forEach(oneStation => {
    // print(distance(latDunois, lonDunois, oneStation.latitude,oneStation.longitude, "K"));
    var dDunois = (distance(latDunois, lonDunois, oneStation.latitude,oneStation.longitude, "K"))
    db.velib.updateOne(
        {_id : oneStation._id},
        {set : {distanceDunois : dDunois}}
    )
})




// On peut faire notre find pour trouver les 5 stations les plus proches
db.velib.find({}, {_id: 0, name:1, distanceDunois:1}).sort({distanceDunois :1}).limit(5)



// Seconde version : en modifiant la structure de la collection et en utilisant l'opérateur géographique $near
// Pour utiliser $near il faut :
 // - respecter l'organisation de GeoJSON (geoJson.org)
 // - avoir un index de type 2dsphere : db.collection.createIndex( { geometry : "2dsphere" } )

// Un curseur pour parcourir les nbStations
var allStations = db.velib.find()

allStations.forEach(oneStation => {
    // on ajoute un champs respectant l'oganisation geoJson
    db.velib.updateOne(
        {_id : oneStation._id},
        {$set : {
                    "emplacement": {
                    "type": "Point",
                    "coordinates": [oneStation.longitude, oneStation.latitude]
                    },
                }
        
        }
    )
    
    
})

// Ajout d'un index de type 2dsphere :
db.velib.createIndex( {emplacement : "2dsphere"} )

// On peut à présent faire notre find() avec l'opérateur $near

db.velib.find(
    {
        emplacement : {
            $near: {
                $geometry: {
                type: "Point",
                coordinates: [lonDunois, latDunois]
                },
                $maxDistance :1000,
                $minDistance : 0,
            },
        }
    }, {_id: 0, name:1}).limit(5)
    

   // pour enlever le champs geometry
   db.velib.updateMany({}, {$unset: {geometry : "j'en veux plus"}})


// Afficher la distance des stations par rapport à la piscine Dunois un utilisant un pipeline d'aggregation et l'étape $geonear
var allStations = db.velib.find()

db.velib.aggregate([
    
    {
        $geoNear : {
            near : { 
                type: "Point",
                coordinates: [lonDunois, latDunois] 
            },
            distanceField: "distance",
            key: "emplacement",
            spherical: true
        }
    },
    { $limit: 5 }
])