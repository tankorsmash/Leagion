module.exports = {
	fetchInfo: {
		credentials: "same-origin",
		headers: {
			//"X-CSRFToken": getCookie("csrftoken"),
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
	}
}
