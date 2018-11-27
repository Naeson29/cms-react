import React, {Component} from 'react';
import Loading from 'react-loading-components';

class SubmitForm extends Component {

    render() {
        return (
            <div className={'submit-form'}>
                <Loading type='oval' width={120} height={120} fill='#3765af' className={'loading'}/>
            </div>
        );
    }
}

export default SubmitForm;
