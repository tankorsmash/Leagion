import PropTypes from 'prop-types';
import ajax from 'common/ajax';

class AjaxTextInputUpdate extends React.Component {
    static propTypes = {
        data: PropTypes.string.isRequired,
        putUrl: PropTypes.string.isRequired,
        putKwarg: PropTypes.string.isRequired,

        successMessage: PropTypes.string,
        errorMessage: PropTypes.string,
    }

    static defaultProps = {
        successMessage: "Updated successfully!",
        errorMessage: "Update failed, please try again.",
    }

    constructor(props){
        super(props);

        this.state = {
            expanded: false,
            data : this.props.data,
        };
    }

    handleDataChanged = (event) => {
        let data = event.target.value;

        this.setCollapsed();

        //dont do anything else if it's the same
        if (data == this.state.data) {
            return;
        };

        this.setState({
            data : data,
        });

        ajax({
            url:this.props.putUrl,
            method: 'PATCH',
            data: {
                [this.props.putKwarg]: data,
            }

        }).then(data => {
            console.log("success: updated", data);
            toastr.success(this.props.successMessage);
        }, error => {
            console.log("failed:", error);
            toastr.error(this.props.errorMessage);
        });

    };

    setExpanded = () => {
        this.setState({expanded: true});
    };

    setCollapsed = () => {
        this.setState({expanded: false});
    };


    render() {
        if (this.state.expanded == false) {
            return  (
                <div
                    className={this.props.className}
                    onClick={this.setExpanded}>
                    { this.state.data }
                </div>
            );
        } else {
            return (
                <input
                    autoFocus
                    onBlur={this.handleDataChanged}
                    defaultValue={ this.state.data }/>
            );
        }
    }
};

module.exports = {
    AjaxTextInputUpdate: AjaxTextInputUpdate,
}
