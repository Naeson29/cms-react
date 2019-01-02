import React, {Component} from 'react';
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
        const {items} = this.state;

        return (
            <tbody>
                {
                    items.map((parameter, idx) => (
                        <tr key={'parameters_' + idx}>
                            <td>{parameter.label}</td>
                            <td>{parameter.value}</td>
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
    logged         : PropTypes.number,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};