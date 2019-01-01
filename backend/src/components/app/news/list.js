import React, {Component} from 'react';
import { Image }          from 'react-bootstrap';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import * as IconRegular   from '@fortawesome/free-regular-svg-icons/index';
import {ACTIONS}          from '../../../utils/actions';
import Truncate           from 'react-truncate';
import PropTypes          from 'prop-types';
import Config             from '../../../configuration';

class List extends  Component {

    constructor(props){
        super(props);

        this.state = {
            items : props.content
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.content !== prevProps.content) {
            this.setState({
                items: this.props.content
            });
        }
    }

    render(){
        const {openRightPanel, updateNews, deleteLine, updateList, boxImage} = this.props;
        const {items} = this.state;
        const url = Config.get('api_url') + 'static/news/';

        return (
            <tbody>
            {
                items.map((item, idx) => (
                    <tr onClick={() =>
                        openRightPanel(ACTIONS.PANEL_NEWS, {
                            news: item,
                            updateNews: updateNews,
                            updateList: updateList
                        })
                    }
                        key={'news_' + idx}
                        className={'clickable'}>
                        <td className={'image'}>
                            {
                                item.image !== undefined &&
                                <Image src={`${url}min_${item.image}`} thumbnail onClick={(e) => {boxImage(e,idx);}}/>
                            }
                        </td>
                        <td className={'label'}>
                            <Truncate lines={1} ellipsis={'...'}>
                                {item.label}
                            </Truncate>
                        </td>
                        <td className={'text no-display'}>
                            <Truncate lines={1} ellipsis={'...'}>
                                {item.text}
                            </Truncate>
                        </td>
                        <td className={'action'}>
                            <FontAwesomeIcon className={'svg'} icon={IconRegular.faTrashAlt} onClick={(e) => {deleteLine(e,item.id_news);}}/>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        );
    }
}

export default List;

List.propTypes = {
    updateNews     : PropTypes.func,
    openRightPanel : PropTypes.func,
    deleteLine     : PropTypes.func,
    updateList     : PropTypes.func,
    boxImage       : PropTypes.func,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};