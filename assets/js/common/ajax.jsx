// {
//     data: {},
//     method: 'GET',
//     url: ''
//
// }
import auth from 'main/auth'
import {getCookie} from 'common/utils';

let ajax = function({data=null, method='GET', url=null, requireLogin=true}) {
	if (!url) {
		throw('you need a url to make an ajax call');
	}

	let body = null;

	if (data) {
		body = JSON.stringify(data);
	}

	let info = {
		method: method,
		body: body,
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
		// The resolver function is called with the ability to resolve or
		// reject the promise
		(resolve, reject) => {
			let error = false;

			fetch(url, info)
				.then(r => {
					if (r.status != 200 && r.status != 201) {
						error = true;
					}

					return r.json()
				})
				.then(data => {
					if (error) {
						reject(data);
					} else {
						resolve(data);

					}
				});
		}
	);

}

module.exports = ajax;
