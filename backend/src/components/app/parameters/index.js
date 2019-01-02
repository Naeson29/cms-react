import React, {Component}  from 'react';
import { Table }           from 'reactstrap';
import PanelFunctions      from '../../../containers/panel/functions';
import PropTypes           from 'prop-types';
import List                from './list';
import Loader              from '../component/loading';
import {PARAMETERS_FRONT}  from '../../../utils/consts';
import {connect} from "react-redux";

class Parameters extends Component {
    constructor(props){
        super(props);
        props.closeAllPanel();
        props.load();
    }

    render() {
        const { content, loading, updateParameters } = this.props;

        let parametersFront;

        if(!loading){
            parametersFront = content.filter((data) => PARAMETERS_FRONT === data.type);
        }

        return (
            <div className={'parameters list'}>
                <h1>
                    <span>{'Parametres'}</span>
                </h1>
                {
                    loading ? <Loader/> :
                        (
                            <div>
                                <div>
                                    <h2>{'Front'}</h2>
                                    <Table responsive striped className="tables">
                                        <List content={parametersFront} updateParameters={updateParameters} />
                                    </Table>
                                </div>
                            </div>
                        )

                }
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(Parameters);

Parameters.propTypes = {
    load             : PropTypes.func.isRequired,
    updateParameters : PropTypes.func.isRequired,
    loading          : PropTypes.bool,
    content          : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    error            : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ])
};
