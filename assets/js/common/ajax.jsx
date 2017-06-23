import auth from 'main/auth'
import {getCookie} from 'common/utils';

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
            let responseHasErrorStatus = false;

            fetch(url, info)
                .then(response => {
                    if (!response.ok) {
                        responseHasErrorStatus = true;
                    }
                    return response.json()
                })
                .then(data => {
                    if (responseHasErrorStatus) {
                        rejectHandler(data);
                    } else {
                        resolveHandler(data);
                    }
                })
                //send err to rejection handler. can't think of a good way to handle
                // server throwing a 500 (thus invalid json)
                .catch(err => {
                    rejectHandler(err);
                });
        }
    );
}
