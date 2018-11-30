import { toast } from 'react-toastify';

export const TYPE_SUCCESS = 1;
export const TYPE_INFO = 2;
export const TYPE_WARNING = 3;
export const TYPE_ERROR = 4;

export default function (action, defaultType, defaultMessage) {
    switch(action.type) {
        default: {
            if (!defaultMessage) {
                return false;
            }

            switch(defaultType) {
                case TYPE_SUCCESS: {
                    toast.success(defaultMessage);
                    break;
                }
                case TYPE_INFO: {
                    toast.info(defaultMessage);
                    break;
                }
                case TYPE_WARNING: {
                    toast.warn(defaultMessage);
                    break;
                }
                case TYPE_ERROR: {
                    toast.error(defaultMessage);
                    break;
                }
            }
        }
    }
}