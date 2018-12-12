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

class User extends Component {
    constructor(props){
        super(props);
        props.load();

        this._updateList   = this._updateList.bind(this);
        this._delete       = this._delete.bind(this);
    }

    _updateList(){
        this.forceUpdate();
    }

    _delete(event, userId){
        event.stopPropagation();
        this.props.deleteUser(userId, () => {});
    }

    render() {
        const { content, openRightPanel, createUser, updateUser, loading } = this.props;

        if(loading){
            return (
                <Loader/>
            );
        }

        return (
            <div className={'user list'}>
                <h1>
                    <span>{'Utilisateurs'}</span>
                    <FontAwesomeIcon
                        icon={IconSolid.faPlusCircle}
                        onClick={() => openRightPanel(ACTIONS.PANEL_USER, {
                            createUser  : createUser,
                            updateList  : this._updateList,
                            count       : (content.length + 1)
                        })}
                    />
                </h1>
                <Table responsive striped className="tables">
                    <thead>
                    <tr>
                        <th>{'Nom'}</th>
                        <th>{'Email'}</th>
                        <th />
                    </tr>
                    </thead>
                    <List
                        content={content}
                        updateUser={updateUser}
                        openRightPanel={openRightPanel}
                        deleteLine={this._delete}
                        updateList={this._updateList}
                    />
                </Table>
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(User);

User.propTypes = {
    load           : PropTypes.func.isRequired,
    openRightPanel : PropTypes.func.isRequired,
    deleteUser     : PropTypes.func.isRequired,
    createUser     : PropTypes.func,
    updateUser     : PropTypes.func,
    loading        : PropTypes.bool,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
