/* Les opérateurs de requête */

// Dans la collection "piscines" de la base "paris", trouver en utilisant les opérateurs de requête
// https://docs.mongodb.com/manual/reference/operator/

// les piscines qui sont dans le 13e arrondissement


// est en fait la requête 


// les piscines qui ne sont pas le 13e arrondissement
// opérateur not equal : $ne


// En affichant uniquement le nom des piscines qui ne sont pas dans le 13eme


// En affichant uniquement le nom de toutes les piscines


// les piscines qui sont soit dans le 13e , soit dans le 14e arrondissement

// Soit avec un $or

// Équivalent à

// Soit avec un $in

// les piscines qui ne sont pas dans le 15, 16, 17 et 18e arrondissement

// En triant par code postal descendant:

// Dans mongo un sort ascendant se fait avec {champ : 1}
// un sort descendant avec { champ : -1 }

// les piscines dont le code postal est supérieur ou égal à 75013 triés par code postal descendant

// Les piscines situées à l'ouest de Notre Dame de Paris
// Coordonnés de Notre Dame : longitude : 2,35 / latitude : 48,853
// A l'ouest = dont la longitude est inférieure à 2,35

// Et leur nombre

// Les piscines dont zipCode=75013 ET id=2929 avec l'opérateur $and et $eq

// On peut simplifier - uniquement l'opérateur $and

// Version la plus courte
