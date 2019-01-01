import React, {Component}  from 'react';
import {connect}           from 'react-redux';
import { Table }           from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PanelFunctions      from '../../../containers/panel/functions';
import {ACTIONS}           from '../../../utils/actions';
import PropTypes           from 'prop-types';
import * as IconSolid      from '@fortawesome/free-solid-svg-icons';
import List                from './list';
import Loader              from '../component/loading';
import Lightbox            from 'react-images';
import Config              from '../../../configuration';

class News extends Component {
    constructor(props){
        super(props);

        props.closeAllPanel();
        props.load();

        this.state = {
            open         : false,
            currentImage : 0
        };

        this._updateList   = this._updateList.bind(this);
        this._delete       = this._delete.bind(this);
        this._boxImage     = this._boxImage.bind(this);
        this._closeBox     = this._closeBox.bind(this);
        this._navBox       = this._navBox.bind(this);
    }

    _updateList(){
        this.forceUpdate();
    }

    _boxImage(event, index){
        event.stopPropagation();
        this.setState({
            open         : true,
            currentImage : index
        });
    }

    _navBox(newCurrent){
        this.setState({
            currentImage : newCurrent
        });
    }

    _closeBox(){
        this.setState({
            open         : false,
            currentImage : 0
        });
    }

    _delete(event, newsId){
        event.stopPropagation();
        this.props.deleteNews(newsId, () => {});
    }

    render() {
        const { content, logged, openRightPanel, createNews, updateNews, loading } = this.props;
        const url = Config.get('api_url') + 'static/news/';

        let images = [];
        content.map((key) =>{
            images.push({src :url + key.image});
        });

        return (
            <div className={'news list'}>
                <h1>
                    <span>{'Actualités'}</span>
                    {
                        !loading &&
                        <FontAwesomeIcon
                            icon={IconSolid.faPlusCircle}
                            onClick={() => openRightPanel(ACTIONS.PANEL_NEWS, {
                                createSlider : createNews,
                                updateList   : this._updateList,
                            })}
                        />
                    }
                </h1>
                {
                    loading ?  <Loader/> :
                        <div>
                            <Table responsive striped className="tables">
                                <thead>
                                    <tr>
                                        <th>{'Image'}</th>
                                        <th>{'Titre'}</th>
                                        <th className={'no-display'}>{'Texte'}</th>
                                        <th />
                                    </tr>
                                </thead>
                                <List
                                    content={content}
                                    updateNews={updateNews}
                                    openRightPanel={openRightPanel}
                                    deleteLine={this._delete}
                                    updateList={this._updateList}
                                    boxImage={this._boxImage}
                                    logged={logged}
                                />
                            </Table>
                            <Lightbox
                                className={'light-box'}
                                images={images}
                                isOpen={this.state.open}
                                onClose={this._closeBox}
                                currentImage={this.state.currentImage}
                                onClickPrev={() => {this._navBox(this.state.currentImage - 1);}}
                                onClickNext={() => {this._navBox(this.state.currentImage + 1);}}
                                imageCountSeparator={' sur '}
                                closeButtonTitle={'Fermer'}
                                backdropClosesModal={true}
                                leftArrowTitle={'Précédente'}
                                rightArrowTitle={'Suivante'}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(News);

News.propTypes = {
    load           : PropTypes.func.isRequired,
    openRightPanel : PropTypes.func.isRequired,
    deleteNews     : PropTypes.func.isRequired,
    closeAllPanel  : PropTypes.func.isRequired,
    createNews     : PropTypes.func,
    updateNews     : PropTypes.func,
    loading        : PropTypes.bool,
    logged         : PropTypes.number,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
