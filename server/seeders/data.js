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
                label : 'Vulputate Mollis Ultricies Fermentum Parturient',
                text  : 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
                image : 'news1.jpg',
            },
            {
                label : 'Tortor Dapibus Commodo Aenean Quam',
                text  : 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
                image : 'news2.jpg',
            },
            {
                label : 'Phasellus volutpat metus',
                text  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
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
    }
];

module.exports = data;