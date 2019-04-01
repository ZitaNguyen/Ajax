$( () => {

    $('#newsletter').submit( function(e) {
        // Bloquer la redirection du formulaire
        e.preventDefault();

        // Réinitialiser les erreurs
        $('#newsletter .is-invalid').removeClass('is-invalid');
        $('#newsletter .invalid-feedback').remove();
        $('#newsletter .alert').remove();

        var email = $('#email').val(); // $('#newsletter input[name="email"]')
        var nom = $('#nom').val();
        var prenom = $('#prenom').val();

        //Validation Email
        if (email.length === 0) {

            $('#email').addClass('is-invalid');
                $('#email').after(`
                <div class="invalid-feedback">
                    Email est vide!
                </div>
            `);

        } else {

            var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            var is_email = re.test(email);
            if ( !is_email ) {

                $('#email').addClass('is-invalid');
                $('#email').after(`
                <div class="invalid-feedback">
                    Email n'est pas correct!
                </div>
            `);

            }
        }

        //Validation Nom
        if (nom.length === 0) {

            $('#nom').addClass('is-invalid');
            $('#nom').after(`
                <div class="invalid-feedback">
                    Nom est vide!
                </div>
            `);

        }

        //Validation Prenom
        if (prenom.length === 0) {

            $('#prenom').addClass('is-invalid');
            $('#prenom').after(`
                <div class="invalid-feedback">
                    Prenom est vide!
                </div>
            `);

        }

        // Fin de la verification des champs
        if ( $('#newsletter').find('.is-invalid').length === 0 ) {

            // si je n'ai pas de classe 'is-invalid' parmi les enfants de ma newsletter, alors il n'y a pas d'erreur et je peux procéder à la suite de mon traitement

            // console.log( $('#newsletter').serialize() );

            console.log( $(this) ); // équivaut à $('#newsletter')

            $.ajax({
                type        : $(this).attr('method'), // le type de ma requete depend de la methode de mon formulaire
                url         : $(this).attr('action'), // le fichier qui s'occupera du traitement de la requete AJAX
                data        : $(this).serialize(), // on formate les données pour PHP. cf. serialize() jquery;
                dataType    : 'JSON', // les données seront retournées au format JSON par notre serveur
                timeout     : 5000 // le nombre de temps ou $.ajax attendra une réponse du serveur
            })
            .done( function(resultat) {

                console.clear();
                console.log( resultat.success );

                if (resultat.success) {

                    // si j'ai un retour positif de mon fichier PHP, j'affiche un message de succès!

                    $('#newsletter').replaceWith(`
                        <div class="alert alert-info">
                            Merci, votre email est bien été ajouté. <br>
                            <u>A tres vite dans notre prochaine newsletter!</u>
                        </div>
                    `);

                } else {

                    // sinon, il y a eu un probleme, nous allons verifier d'ou viens le soucis

                    // A. Email deja present dans la base?
                    if (resultat.errors.isEmailInDb) {

                        $('#newsletter').prepend(`
                            <div class="alert alert-danger">
                                Attention, votre adresse email est<br>
                                <u>déjà présente dans nos listes!</u>
                            </div>
                        `);

                    }

                    // B. Email est invalid
                    if (resultat.errors.isEmailInvalid) {
                        $('#newsletter').prepend(`
                            <div class="alert alert-danger">
                                Attention, votre adresse email n'est<br>
                                <u>pas un bon format!</u>
                            </div>
                        `);
                    }

                    // C. Email est vide
                    if (resultat.errors.isEmailEmpty) {
                        $('#newsletter').prepend(`
                            <div class="alert alert-danger">
                                Attention, votre adresse email est vide!
                            </div>
                        `);
                    }

                }
            });
 
        } else {

            // Sinon, il y a des erreurs dans le formulaire. je peux afficher un message d'erreur

            $('#newsletter').prepend(`
                <div class="alert alert-danger">
                    Attention, nous n'avons pas été en mesure de traiter votre demande. <br>
                    <u>Vérifier vos informations</u>
                </div>
            `);

        }  // end find('.is-invalid')

    }); // end $('#newsletter').submit()

}); // end $(function(){})