// Declarer un tableau numerique
const Prenoms = ["Hugo", "David", "Farid", "Justine", "Khalid"];

// Apercu dans la console
console.log(Prenoms);

// Si je veux connaitre le nombre d'elements de mon tableau
let nombreElementsDansMonTableau = Prenoms.length;
console.log(nombreElementsDansMonTableau);

// Pour recuperer une valeur dans le tableau numerique j'utilise son indice (index)
console.log( Prenoms[1] ); // David
console.log( Prenoms[3] ); // Justine

let i = 2;
console.log ( Prenoms[i] ); // Farid

// Pour i=0 (au depart i vaut 0) ; tant que i < (est strictement inferieur) a nombreElementDansMonTableau (Prenoms.length); alors i++ (j'incrémente i de 1)
for( let i = 0; i < nombreElementsDansMonTableau; i++) {

    // Tous ce qui est situe a l'interieur des accolades, sera dans la boucle
    console.log('Ici, i = ' + i);
    console.log( Prenoms[i] );
    console.log( '---' );

} // Fin de la boucle for

// Voyons maintenant, comment procéder avec des objets
const Contact = {
    // INDICE : VALEUR
    prenom : "Zita", 
    nom    : "NGUYEN",
    tel    : "07 01 02 03 04"
};

// apercu dans la console
console.log ( Contact );

// Pour recuperer les valeurs d'un objet, j'utilise le "." suivi de l'INDICE
console.log( "Prenom: " + Contact.prenom);
console.log( "Nom: " + Contact.nom);
console.log( "Tel: " + Contact['tel'] ); // autre possibilite

const Contacts = [
    "Thomas", 
    "Hugo",
    {
        // INDICE : VALEUR
        prenom : "Ivan", 
        nom    : "BRAGA",
        age    : 18
    },
    {
        // INDICE : VALEUR
        prenom : "Bruno", 
        nom    : "COUGNY",
        tel    : 47
    }
];

// Apercu dans la console
console.clear();
console.log( Contacts );

// Comment tacceder aux valeurs de mon object, dans le tableau numerique

// 1. D'abord, je recupere mon objet
console.log( Contacts[2] );

// 2. Pour acceder aux valeurs de mon objet
console.log ("Prenom: " + Contacts[2].prenom);
console.log ("Nom: " + Contacts[2].nom);
console.log ("Age: " + Contacts[2].age);

// En resume, j'accede a la valeur de l'indice "prenom" de l'objet situe a l'index 2 de mon tableau numerique "Contacts"

// Comment parcourir un tableau avec des objets
// Partons du tableau suivant: 
const Etudiants = [
    { prenom: "Hugo", nom: "LIEGEARD", competence: "Fullstack"},
    { prenom: "David", nom: "GUERRA", competence: "Front"},
    { prenom: "Rachid", nom: "KAMAN", competence: "Back"},
    { prenom: "Zita", nom: "NGUYEN", competence: "Fullstack"},
    { prenom: "Thomas", nom: "CHEYLAS", competence: "Front"},
    { prenom: "Asam", nom: "AHMAD", competence: "Front"}
];

// Regardons dans la console
console.log ( Etudiants );

// Si je veux connaitre le nombre d'etudiants
const nombreEtudiants = Etudiants.length;
console.log("Nombre d'étudiants = " + nombreEtudiants);

/* ------------------------------------------------------
    |       ~ ~ ~ ~    💀  EXERCICE 😜     ~ ~ ~ ~          |
    |                                                        |  
    |                                                        |  
    |  Affichez dans la page HTML à l'aide de jQuery la      | 
    |  liste (ul>li) des Etudiants et leur competence.           | 
    |                                                        | 
    |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _  */

// jQuery(document).ready(function() {...});
// $(document).ready(function() {...});
// $(function() {...});

$(function() {

    // Ici, jQuery est prêt à travailler

    console.log('jQuery is ready to rock');

    // Creation d'une balise <ul></ul>
    const ul = $('<ul>');

    for (let i = 0; i < nombreEtudiants; i++) {

        // Je recupere l'etudiant en cours dans ma boucle
        let Etudiant = Etudiants[i];

        // Apercu dans la console
        console.log( Etudiant );

        $(`
            <li>
                <strong> ${Etudiant.prenom} ${Etudiant.nom} </strong> - ${Etudiant.competence}
            </li>
        `).appendTo( ul );

        // $("#list").append("<li>" + Etudiants[i].nom + " "+ Etudiants[i].prenom + " " + Etudiants[i].competence + "</li>")
    } // Fin boucle for

    ul.appendTo( $('body') );

});

