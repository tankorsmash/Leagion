// {
//     data: {},
//     method: 'GET',
//     url: ''
//
// }
import auth from 'main/auth'
import {getCookie} from 'common/utils';

let ajax = function(options) {
	let data = options.data || null;
	let body = null;
	if (data) {
		body = JSON.stringify(data);
	}

	let info = {
		method: options.method || 'GET',
		body: body,
		credentials: "same-origin",
		headers: {
			"X-CSRFToken": getCookie("csrftoken"),
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
	}

	return new Promise(
		// The resolver function is called with the ability to resolve or
		// reject the promise
		(resolve, reject) => {
			fetch(options.url, info)
				.then(r => {
					if (r.status == 200) {
						return r.json()
					} else {
						$.toastr.error(`bad request -> url:${r.url}, status ${r.status} - ${r.statusText}`);
						reject(r);
					}
				})
				.then(data => {
					resolve(data);
				});
		}
	);

}

module.exports = ajax;
