import React, {Component}  from 'react';
import { Table }           from 'reactstrap';
import PropTypes           from 'prop-types';
import List                from './list';
import Loader              from '../component/loading';

class Parameters extends Component {
    constructor(props){
        super(props);
        props.load();
    }

    render() {
        const { content, loading } = this.props;

        return (
            <div className={'parameters list'}>
                <h1>
                    <span>{'Parametres'}</span>
                </h1>
                {
                    loading ? <Loader/> :
                        <Table responsive striped className="tables">
                            <List
                                content={content}
                            />
                        </Table>
                }
            </div>
        );
    }
}

export default Parameters;

Parameters.propTypes = {
    load           : PropTypes.func.isRequired,
    loading        : PropTypes.bool,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    error          : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ])
};
