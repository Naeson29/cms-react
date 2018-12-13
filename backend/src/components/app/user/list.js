import React, {Component} from 'react';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import * as IconRegular   from '@fortawesome/free-regular-svg-icons/index';
import {ACTIONS}          from '../../../utils/actions';
import PropTypes          from 'prop-types';

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
        const {openRightPanel, updateUser, deleteLine, updateList} = this.props;
        const {items} = this.state;

        return (
            <tbody>
                {
                    items.map((user, idx) => (
                        <tr
                            onClick={() =>
                                openRightPanel(ACTIONS.PANEL_USER, {
                                    user: user,
                                    updateUser: updateUser,
                                    updateList: updateList
                                })
                            }
                            key={'user_' + idx}
                            className={'clickable'}>
                            <td>{user.lastName}</td>
                            <td>{user.firstName}</td>
                            <td className={'no-display'}>{user.email}</td>
                            <td className={'action'}>
                                <FontAwesomeIcon className={'svg'} icon={IconRegular.faTrashAlt} onClick={(e) => {deleteLine(e,user.id_user);}}/>
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
    updateUser     : PropTypes.func,
    openRightPanel : PropTypes.func,
    deleteLine     : PropTypes.func,
    updateList     : PropTypes.func,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};