// Vélib

// Récupérer un fichier json des velib chez jcdecaux developer
// Importer dans la base paris, le fichier jcdecaux.json dans une collection velib


// Cette fois-ci les données sous fournies sous la forme d'un tableau d'objets, il faut donc ajouter l'option --jsonArray pour importer
mongoimport --db paris --collection velib --file "C:\Users\Prof\Desktop\MongoDB\Données\jcdecaux_velib_paris.json" --jsonArray
 
// Problème ! On n'a pas de champ codepostal ... On retrouve le code postal dans l'adresse.

// Dans la regex  \d : Matches any decimal digit. Equivalent to [0-9].
const address = "QUAI ANATOLE FRANCE - PONT SOLFERINO - 75007 PARIS - QUAI ANATOLE FRANCE - PONT SOLFERINO - 75008 PARIS";
address.match(/\d{5}/g)
// Mettez à jour tous les enregistrements en leur ajoutant un champ zipCode
var allStations = db.velib.find();

allStations.forEach( oneStation => {
    //print (oneStation.address.match(/[0-9]{5}/));
    // La méthode match renvoie un tableau
    // Pour n'avoir que le premier indice
    //print (oneStation.address.match(/[0-9]{5}/)[0]);
    var codePostal = oneStation.address.match(/[0-9]{5}/)[0];
    db.velib.updateOne(
        { _id : oneStation._id },
        { $set : { zipCode : codePostal}}
    )
});
db.velib.findOne();
// Quel est l'arrondissement de Paris où il y a le plus de stations ? (avec un $in)      
db.velib.aggregate([
    { $match : { zipCode : { $in : ["75001","75002","75003","75004","75005","75006","75007","75008","75009","75010","75011","75012","75013","75014","75015","75016","75017","75018","75019","75020"] } } },
    { $group : { _id : "$zipCode", nbStations : { $sum : 1 } } },
    { $sort : { nbStations : -1 }},
    { $limit : 3 }
])
// OU plus élégant  
db.velib.aggregate([
    { $match : { zipCode : /^75/ } }, // regex qui sélectionne les zipCode commentçant par 75
    { $group : { _id : "$zipCode", nbStations : { $sum : 1 } } },
    { $sort : { nbStations : -1 }},
    { $limit : 3 }
])

// Quelle est la ville (hors Paris) qui a le plus de stations
db.velib.aggregate([
    { $match : { zipCode : { $nin : ["75001","75002","75003","75004","75005","75006","75007","75008","75009","75010","75011","75012","75013","75014","75015","75016","75017","75018","75019","75020"] } } },
    { $group : { _id : "$zipCode", nbStations : { $sum : 1 } } },
    { $sort : { nbStations : -1 }},
    { $limit : 3 }
])
// Ou plus élégant 
db.velib.aggregate([
    { $match : { zipCode : /^(?!75)/ } }, // regex qui sélectionne les zipCode ne commençant pas par 75
    { $group : { _id : "$zipCode", nbStations : { $sum : 1 } } },
    { $sort : { nbStations : -1 }},
    { $limit : 3 }
])

// Cherchez la piscine Dunois .
db.piscines.find({ name : /dunois/i })



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

// Exemple : distance entre Notre Dame et la piscine Dunois
const latDunois = 48.832973;
const lonDunois = 2.366437;
distance(latDunois, lonDunois, 48.853, 2.35, "K")

// Ajouter un champ distanceDunois à toutes les stations
// Cette distance sera égale à la valeur de retour de la fonction distance()


// On peut faire notre find pour trouver les 5 stations les plus proches




// Seconde version : en modifiant la structure de la collection et en utilisant l'opérateur géographique $near
// Pour utiliser $near il faut :
 // - respecter l'organisation de GeoJSON (geoJson.org)
 // - avoir un index de type 2dsphere : db.collection.createIndex( { geometry : "2dsphere" } )

// Un curseur pour parcourir les nbStations


// Ajout d'un index de type 2dsphere :


// On peut à présent faire notre find() avec l'opérateur $near



// Afficher la distance des stations par rapport à la piscine Dunois un utilisant un pipeline d'aggregation et l'étape $geonear
