import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';
import Loading from 'react-loading-components';
import PropTypes from 'prop-types';
import Config from '../../../configuration'

class Home extends Component {

    constructor(props){
        super(props);
        props.load();
    }

    render() {
        const { loadingSlide, slider } = this.props;
        const url = Config.get('api_url') + 'static/slider/';

        return (
            <div className={'home'}>
                {
                    loadingSlide
                        ?
                        <div className={'slider-container'}>
                            <div className={'loading'}>
                                <Loading type='oval' width={120} height={120} fill='#7E8284' className={'loading'}/>
                            </div>
                        </div>
                        :
                        <Slider
                            className="slider-container"
                            previousButton={<FontAwesomeIcon icon={IconSolid.faChevronCircleLeft} />}
                            nextButton={<FontAwesomeIcon icon={IconSolid.faChevronCircleRight} />}
                            duration={800}
                        >
                            {
                                slider.map((item, index) => (
                                    <div key={'slider_' + index} className="slider-content" style={{ background: `url('${url + item.image}') no-repeat center center` }}>
                                        <div className="inner">
                                            <h2>{item.label}</h2>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                }
                <div className={'content-full'}>
                    <h1>{'Présentation'}</h1>
                    <div className="content col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
                        <div className={'column'}>
                            <h3>{'Qu\'est-ce que le Lorem Ipsum?'}</h3>
                            <p>
                                {'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise ' +
                                'en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie ' +
                                'depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de ' +
                                'texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre ' +
                                'cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu ' +
                                'n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles ' +
                                'Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion ' +
                                'dans des applications de mise en page de texte, comme Aldus PageMaker.'}
                            </p>
                            <h3>{'D\'où vient-il?'}</h3>
                            <p>
                                {'On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est ' +
                                'source de distractions, et empêche de se concentrer sur la mise en page elle-même. ' +
                                'L\'avantage du Lorem Ipsum sur un texte générique comme \'Du texte. Du texte. Du ' +
                                'texte.\' est qu\'il possède une distribution de lettres plus ou moins normale, et en ' +
                                'tout cas comparable avec celle du français standard. De nombreuses suites logicielles de ' +
                                'mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, ' +
                                'et une recherche pour \'Lorem Ipsum\' vous conduira vers de nombreux sites qui n\'en sont ' +
                                'encore qu\'à leur phase de construction.'}
                            </p>
                        </div>
                        <div className={'column'}>
                            <h3>{'Pourquoi l\'utiliser?'}</h3>
                            <p>
                                {'Contrairement à une opinion répandue, le Lorem Ipsum n\'est pas simplement du texte ' +
                                'aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique ' +
                                'datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney ' +
                                'College, en Virginie, s\'est intéressé à un des mots latins les plus obscurs, consectetur, ' +
                                'extrait d\'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la ' +
                                'littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en ' +
                                'fait des sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" (Des Suprêmes ' +
                                'Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, ' +
                                'est un traité sur la théorie de l\'éthique. Les premières lignes du Lorem Ipsum, "Lorem ' +
                                'ipsum dolor sit amet...", proviennent de la section 1.10.32.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Home);

Home.propTypes = {
    load         : PropTypes.func.isRequired,
    loadingSlide : PropTypes.bool,
    slider       : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
