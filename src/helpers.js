import {modalDialog, MODAL_TYPES} from './components/common/modalDialog/ModalDialog';

/**
 * Fetch error helper
 *
 * @param response {object}
 * @returns {Promise.<TResult>}
 */

const handleResponse = (response) => {
    return response.text().then(text => {
        return response.ok ? text : Promise.reject(text);
    });
};

/**
 * Get string by fetch HTTP method for
 *
 * @param method (POST, GET)
 * @param params
 * @returns string
 */
const getParamsByFetchMethod = (method, params) => {
    switch (method) {
        case 'GET':
            let str = '';
            let prefix = '';
            for (let param in params) {
                prefix = (str === '') ? '?' : '&';
                str = str + prefix + param + '=' + params[param];
            }
            return str;
        case 'POST': return JSON.stringify(params);
        default: return '';
    }
};

// Method to show dlg if we have some error in fetch
const showDlgIfNetError = (error) => {
    // Нет связи с сервером!
    if (error && error.message && error.message === 'Failed to fetch') {
        modalDialog.show({
            type: MODAL_TYPES.ERROR,
            bodyMsg: 'Нет связи с сервером!',
        });
    }
};

export { handleResponse, getParamsByFetchMethod, showDlgIfNetError };