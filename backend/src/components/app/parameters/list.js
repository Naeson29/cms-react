import React, {Component} from 'react';
import PropTypes          from 'prop-types';

class List extends  Component {

    constructor(props){
        super(props);

        this.state = {
            parameters : props.content
        };
    }

    _handleChange(index, value) {
        let newItem = this.state.parameters;
        newItem[index].value = value;

        this.setState({parameters: newItem});

        this.props.updateParameters(this.state.parameters[index].id_parameter, newItem[index])
    }

    render(){
        const {parameters} = this.state;

        return (
            <tbody>
                {
                    parameters.map((parameter, idx) => (
                        <tr key={'parameters_' + idx}>
                            <td>{parameter.label}</td>
                            <td className={'align-right'}>
                                <label className={'container-check' + (parameter.value ? ' active' : '')} htmlFor="label">
                                    <input name={idx} className={'checkbox'} type="checkbox" value={parameter.value} defaultChecked={parameter.value}/>
                                    <span className={'check check-list'} onClick={() => {this._handleChange(idx, !parameter.value )}}/>
                                </label>
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
    updateParameters : PropTypes.func,
    content          : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};