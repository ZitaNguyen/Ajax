<?php

# Connexion à la BDD
$db = new PDO('mysql:host=localhost;dbname=newsletter', 'root', '', [
    PDO::ATTR_ERRMODE               => PDO::ERRMODE_WARNING, 
    PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
]);

// Pour communiquer avec votre page HTML/JS; PHP doit retourner une réponse au format json par exemple

// on déclare que notre fichier va renvoyer du JSON
// pas obligatoire...
header('Content-Type: application/json');

// détecter la méthode POST
if ( !empty($_POST) ) {

    // récupération des données POST
    $prenom = $_POST['prenom'];
    $nom    = $_POST['nom'];
    $email  = $_POST['email'];

    // vérification des données soumises par l'utilisateur
    $errors = [];

    // vérification du mail
    if ( !empty($email) ) {
        
        // si mon email n'est pas vide, alors je vérifie qu'il est au bon format, qu'il est valide
        if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {

            // si i'email saisie par l'utilisateur n'est pas au bon format, alors je doit retourner une erreur
            $errors['isEmailInvalid'] = true;

        } else {

            # mon email est valide, je vérifie dans la BDD, s'il n'est pas déjà présent

            // je compte dans ma base le nombre d'email correspondant à l'email saisie par l'utilisateur dans le formulaire
            $query = $db->prepare('SELECT COUNT(id) FROM contact WHERE email_contact = :email');

            // si ma requete retourne 0, il n'y a pas d'email dans la base. sinon, il y a eu une correspondance
            $query->bindValue(':email', $email, PDO::PARAM_STR);
            $query->execute();

            if($query->fetchColumn()) {

                //  dans cette condition, $query->fetchColumn() retourne 1. soit true. autrement dit, cet email existe deja dans la BDD
                $errors['isEmailInDb'] = true;

            } else {

                // sinon, l'adresse email de mon utilisateur n'est pas deja prensente dans la BDD. je peux proceder a l'insertion
                $query = $db->prepare('INSERT INTO contact (prenom_contact, nom_contact, email_contact) VALUES (:prenom, :nom, :email)');

                $query->bindValue(':prenom', $prenom, PDO::PARAM_STR);
                $query->bindValue(':nom', $nom, PDO::PARAM_STR);
                $query->bindValue(':email', $email, PDO::PARAM_STR);

                $query->execute();

            }

        }

    } else {

        // sinon, l'email est vide, je doit retourner une erreur
        $errors['isEmailEmpty'] = true;

    } // end !empty($email)

    // une fois le traitement terminé, on va faire un retour a l'application

    if ( empty( $errors ) ) {

        // tous s'est bien passé, je retourne une réponse positive à newsletter.js
        echo json_encode(['success' => true]);

    } else {

        // sinon, il y a eu des erreurs, je retourne mon tableau d'erreurs. 
        echo json_encode([
            'success' => false,
            'errors' => $errors    
        ]);

    }

} else { // end !empty($_POST)

    // Ici, aucune donnée n'a été soumise via POST.
    // $_POST est vide...

    echo json_encode([
        'nodata' => 'Aucune donnée détectée'
    ]);

} 