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

        props.closeAllPanel();
        props.load();

        this._updateList   = this._updateList.bind(this);
        this._delete       = this._delete.bind(this);
    }

    _updateList(){
        this.forceUpdate();
    }

    _delete(userId){
        this.props.deleteUser(userId, () => {});
    }

    render() {
        const { content, logged, openRightPanel, createUser, updateUser, loading } = this.props;

        return (
            <div className={'user list'}>
                <h1>
                    <span>{'Utilisateurs'}</span>
                    {
                        !loading &&
                        <FontAwesomeIcon
                            icon={IconSolid.faPlusCircle}
                            onClick={() => openRightPanel(ACTIONS.PANEL_USER, {
                                createUser  : createUser,
                                updateList  : this._updateList,
                            })}
                        />
                    }
                </h1>
                {
                    loading ? <Loader/> :
                        <Table responsive striped className="tables">
                            <thead>
                                <tr>
                                    <th>{'Nom'}</th>
                                    <th>{'Prénom'}</th>
                                    <th className={'no-display'}>{'Email'}</th>
                                    <th />
                                </tr>
                            </thead>
                            <List
                                content={content}
                                logged={logged}
                                updateUser={updateUser}
                                openRightPanel={openRightPanel}
                                deleteLine={this._delete}
                                updateList={this._updateList}
                            />
                        </Table>
                }
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(User);

User.propTypes = {
    load           : PropTypes.func.isRequired,
    openRightPanel : PropTypes.func.isRequired,
    deleteUser     : PropTypes.func.isRequired,
    closeAllPanel  : PropTypes.func.isRequired,
    createUser     : PropTypes.func,
    updateUser     : PropTypes.func,
    loading        : PropTypes.bool,
    logged         : PropTypes.number,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    error          : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ])
};
