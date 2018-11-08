import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';

export class Home extends React.Component {

    render() {

        const content = [
          {
              title: 'Vulputate Mollis Ultricies Fermentum Parturient',
              description:
                  'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
              image: 'https://i.imgur.com/ZXBtVw7.jpg',
          },
          {
              title: 'Tortor Dapibus Commodo Aenean Quam',
              description:
                  'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
              image: 'https://i.imgur.com/DCdBXcq.jpg',
          },
          {
              title: 'Phasellus volutpat metus',
              description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
              image: 'https://i.imgur.com/DvmN8Hx.jpg',
          }
        ];

        return (
            <div className={'home'}>
                <Slider
                    className="slider-container"
                    previousButton={<FontAwesomeIcon icon={IconSolid.faChevronLeft} />}
                    nextButton={<FontAwesomeIcon icon={IconSolid.faChevronRight} />}
                    duration={1000}
                >
                    {
                        content.map((item, index) => (
                            <div key={'slider_' + index} className="slider-content" style={{ background: `url('${item.image}') no-repeat center center` }}>
                                <div className="inner">
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
                <div className="content col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
                    <h3>Home</h3>
                </div>
            </div>
        );
    }
}
