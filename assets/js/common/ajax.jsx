import auth from 'main/auth'
import {getCookie} from 'common/utils';

function validateStatusCode(statusCode) {
    const validStatusCodes = [200, 201];
    return validStatusCodes.includes(statusCode) == false;
};

export default function ajax({
    data=null,
    method='GET',
    url=null,
    requireLogin=true
}) {
    if (!url) {
        throw('you need a url to make an ajax call');
    }

    if (url.includes("undefined")) {
        console.warn(`'undefined' found in URL, potential for unset variables upstream in '${url}'`)
    }

    let info = {
        method: method,
        body: data ? JSON.stringify(data) : null,
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }

    if (requireLogin) {
        info.headers.Authorization = `Token ${localStorage.token}`;
    }

    return new Promise(
        (resolveHandler, rejectHandler) => {
            let isValidStatusCode = false;

            fetch(url, info)
                .then(response => {
                    isValidStatusCode = validateStatusCode(response.status);
                    return response.json()
                })
                .then(data => {
                    if (isValidStatusCode) {
                        rejectHandler(data);
                    } else {
                        resolveHandler(data);
                    }
                });
        }
    );
}
