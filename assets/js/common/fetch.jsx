// {
//     data: {},
//     method: 'GET',
//     url: ''
//
// }
let ajax = function(options) {
	let data = options.data || {};
	let body  = JSON.stringify(data);

	let info = {
		method: options.method || 'GET',
		body: body,
		credentials: "same-origin",
		headers: {
			//"X-CSRFToken": getCookie("csrftoken"),
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
	}

	return new Promise(
		// The resolver function is called with the ability to resolve or
		// reject the promise
		(resolve, reject) => {
			fetch(options.url, info)
				.then(r => r.json())
				.then(data => {
					resolve(data);
				})
		}
	);

}

module.exports = ajax;
