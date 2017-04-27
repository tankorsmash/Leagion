class FormBase extends React.Component {
    constructor(props) {
        super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
        console.log(name, value);

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		throw 'you must override handleSubmit method when making a form';
	}
}

module.exports = {
    FormBase: FormBase
}
