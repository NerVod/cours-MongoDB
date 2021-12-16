/* Les restaurants de NewYork */

// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurant.json
// sur PC : Se mettre dans le dossier où il y l'executable mongoimport

// Combien y a-t-il de restaurants ?

// Identique à

// Trouver les restaurants qui sont dans la rue "Morris Park Ave"

// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"

// L'utilisation d'une regex permet de récupérer les 2 orthographes (et éventuellement les orthographes alternatives en minuscules avec le flag i(nsensitive) )

// Afficher uniquement (sans l'id) les champs quartier, type de cuisine et adresse

// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie.
// Avec un $or

// Avec le $and implicite

// Avec un $in

// La variable restaurants est un objet. Dans mongo, ils appellent cela un curseur...
var allRestaurants = db.restaurants.find().limit(10);
// Parcours d'un curseur avec un while

// Parcours d'un curseur avec un foreach

// Quel est le type de restaurant le plus présent ?
// Vous pouvez le faire en vanillaJS

// Autre méthode. Plus élégante ??
// C'est le pipeline d'aggregation

// Pour limiter aux restos de Staten Island
