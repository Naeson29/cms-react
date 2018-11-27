import React, { Component }    from 'react';
import {Button}                from 'reactstrap';
import PanelActions            from '../component/panelActions';
import Gallery                 from 'react-fine-uploader';
import Config                  from '../../../configuration';
import FineUploaderTraditional from 'fine-uploader-wrappers';

import {EXTENSION_IMAGE, NOTIFICATION, SIZE_IMAGE} from "../../../utils/consts";

class Upload extends Component {
    constructor(props){
        super(props);

        this.state = {

        };

        this.uploader = new FineUploaderTraditional({
            options: {
                autoUpload : false,
                multiple   : false,
                chunking   : {
                    enabled : true
                },
                deleteFile : {
                    enabled : false,
                },
                request    : {
                    customHeaders : {
                        'Authorization' : 'Bearer ' + Config.get('api_token'),
                    },
                    endpoint: Config.get('api_url') + 'api/upload/',
                    requireSuccessJson : true,
                },
                validation : {
                    allowedExtensions : EXTENSION_IMAGE,
                    sizeLimit         : SIZE_IMAGE
                },
                messages : {
                    typeError : NOTIFICATION.error.extension,
                    sizeError : NOTIFICATION.error.size
                },
                callbacks : {
                    onValidate : (data) => {
                        this._changeImage(data);
                    },
                    onError    : (id, name, message) => {
                        this._errorFile(message);
                    }
                },

            }
        });
    }

    //this.uploader.methods.uploadStoredFiles();

    // const image = this.uploader.methods.getUploads({
    //     status: this.uploader.qq.status.SUBMITTED
    // }).length;
    //
    // if(image === 0){
    //     errors.image = true;
    // }

    // _changeImage(data){
    //     if(data.name){
    //         let errorList = this.state.formErrors;
    //         delete errorList.image;
    //         this.setState({formErrors: {...errorList}, errorFile : ''});
    //     }
    // }


    _errorFile(message){
        this.setState({ errorFile: <span className={'error'}>{message}</span>});
    }

    render(){
        return (
            <form id="uploadSlider" autoComplete="off">
                <div className="bloc-form">
                    <Gallery uploader={this.uploader} />
                    {this.state.errorFile}
                </div>
                <PanelActions {...this.props}>
                    <Button color={'primary'}>{'Enregistrer'}</Button>
                </PanelActions>
            </form>
        )
    }
}

export default Upload;