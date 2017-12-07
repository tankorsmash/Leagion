const DEFAULT_HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

function buildInitialHandler(errorInfo) {
    return (response) => {
        errorInfo.responseHasErrorStatus = !response.ok;
        if (response.status === 204) {
            return {};
        }
        return response.json();
    };
}

function buildResponseHandler(errorInfo, onSuccess, onError) {
    return (data) => {
        if (errorInfo.responseHasErrorStatus == false) {
            onSuccess(data);
        } else {
            onError(data);
        }
    };
}

function validateUrl(url) {
    if (!url) {
        throw('you need a url to make an ajax call');
    }

    if (url.includes("undefined")) {
        console.warn(`'undefined' found in URL, potential for unset variables upstream in '${url}'`)
    }
}

export default function ajax({
    data=null,
    method='GET',
    url=null,
    requireLogin=true,
    headers=null,
    stringifyData=true,
}) {
    validateUrl(url);

    //add query params from data if it's a GET
    if (method === 'GET' && data) {
        const urlParams = new URLSearchParams(Object.entries(data));
        url += '?' + urlParams;
        data = null;
    }

    if (stringifyData && data) {
        data = JSON.stringify(data);
    }

    let info = {
        method: method,
        body: data,
        credentials: "same-origin",
    };

    if (headers != null) {
        info.headers = headers;
    } else {
        info.headers = DEFAULT_HEADERS;
    }

    if (requireLogin) {
        info.headers.Authorization = `Token ${localStorage.token}`;
    }

    return new Promise(
        (onSuccess, onError) => {
            //can't pass a variable by ref in js, but you can alter properties
            let errorInfo = {
                responseHasErrorStatus: false,
            };

            fetch(url, info)
                .then(buildInitialHandler(errorInfo))
                .then(buildResponseHandler(errorInfo, onSuccess, onError))
                //send err to rejection handler. can't think of a good way to handle
                // server throwing a 500 (thus invalid json)
                .catch(err => {
                    onError(err);
                });
        }
    );
}
