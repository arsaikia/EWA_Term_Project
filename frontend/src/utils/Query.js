import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    GET: ({ url = '' }) =>
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*',
                // Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: 'cors',
            url: process.env.REACT_APP_API_BASE_URL + url,
        }).catch((error) => {
            // eslint-disable-next-line
            console.log(error);
        }),
    POST: ({ url = '', body = {} }) =>
        axios({
            data: body,
            headers: {
                'Access-Control-Allow-Origin': '*',
                // Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            url: process.env.REACT_APP_API_BASE_URL + url,
        }).catch((error) => {
            // eslint-disable-next-line
            console.log(error);
        }),
};
