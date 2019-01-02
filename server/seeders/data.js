'use strict';
const moment = require('moment');

const data = [
    {
        'model' : 'User',
        'documents' : [
            {
                email     : 'nnahmias@beable.fr',
                password  : '123456',
                lastName  : 'Nahmias',
                firstName : 'Nicolas'
            },
            {
                email     : 'Pierre@beable.fr',
                password  : '123456',
                lastName  : 'Richard',
                firstName : 'Pierre'
            }
        ]
    },
    {
        'model': 'Slider',
        'documents': [
            {
                label : 'Vulputate Mollis Ultricies Fermentum Parturient',
                text  : 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
                image : 'seed1.jpg',
                order : 1
            },
            {
                label : 'Tortor Dapibus Commodo Aenean Quam',
                text  : 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
                image : 'seed2.jpg',
                order : 2
            },
            {
                label : 'Phasellus volutpat metus',
                text  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
                image : 'seed3.jpg',
                order : 3
            }
        ]
    },
    {
        'model': 'News',
        'documents': [
            {
                label : 'Concilier performance et agilité pour mieux accompagner les métiers',
                text  : 'Défendre ses budgets, défendre les intérêts de son entreprise, défendre ses capacités à faire évoluer son architecture IT : les enjeux de la relation fournisseurs sont fondamentaux pour les DSI. Le 24 janvier 2019, notre confrère CIO organise une matinée sur le thème « Fournisseurs IT : les liaisons dangereuses - De la stratégie d\'achat à la gestion quotidienne » au Centre d\'affaires Paris Trocadéro. Son objet sera d\'expliciter les meilleures pratiques en matière de relations fournisseurs.',
                image : 'news1.jpg',
            },
            {
                label : 'La Commission européenne pointe l\'urgence d\'accélérer sur l\'IA en Europe',
                text  : 'Pour tenter de combler le retard qui se creuse avec les Etats-Unis et la Chine sur les technologies d\'intelligence artificielle, la Commission européenne enjoint les états-membres et les entreprises à se mettre rapidement en ordre de marche sur les investissements dans ce domaine. Elle présente un plan en 4 axes : financement, constitution de bases de données communes, renforcement des compétences et instauration de la confiance dans l\'IA.',
                image : 'news2.jpg',
            },
            {
                label : 'La prochaine stratégie de la Commission européenne sera data-driven',
                text  : 'La Commission européenne vient de publier sa stratégie numérique, adoptée le 21 novembre 2018. L\'objectif affiché est d\'évoluer « vers une administration transformée numériquement, centrée sur l\'utilisateur et fondée sur les données ». Les données sont, comme le rappelle la Commission, le coeur d\'une saine prise de décision. La logique du « Dites le moi une seule fois » chère aux instances françaises est aussi mise en avant au niveau européen, grâce aux échanges de données rendus possibles par une interopérabilité garantie, bien entendu dans le respect des données personnelles.',
                image : 'news3.jpg',
            }
        ]
    },
    {
        'model': 'Event',
        'documents': [
            {
                title  : 'Evenement de test',
                allDay : false,
                start  : moment().add(2, "hours"),
                end    : moment().add(4, "hours").add(25, "minutes"),
            },
            {
                title  : 'Anniversaire de Paul',
                allDay : false,
                start  : moment().add(1, "days").add(1, "hours"),
                end    : moment().add(1, "days").add(3, "hours").add(30, "minutes"),
            },
            {
                title  : 'Réunion DEV',
                allDay : true,
                start  : moment().add(2, "days"),
                end    : moment().add(2, "days"),
            }
        ]
    },
    {
        'model': 'Parameter',
        'documents': [
            {
                label  : 'Actualités',
                value  : true,
                type   : 1
            }
        ]
    }
];

module.exports = data;