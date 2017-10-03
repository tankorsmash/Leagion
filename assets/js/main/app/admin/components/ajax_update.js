import PropTypes from 'prop-types';

import ajax from 'common/ajax';

class AjaxTextInputUpdate extends React.Component {
    static propTypes = {
        data: PropTypes.string,
        putUrl: PropTypes.string.isRequired,
        putKwarg: PropTypes.string.isRequired,

        successMessage: PropTypes.string,
        onSuccessCallback: PropTypes.func,

        errorMessage: PropTypes.string,
        onErrorCallback: PropTypes.func,

        default: PropTypes.string,
    }

    static defaultProps = {
        successMessage: "Updated successfully!",
        onSuccessCallback: () => {},
        errorMessage: "Update failed, please try again.",
        onErrorCallback: () => {},

        default: "Enter here",
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
            this.props.onSuccessCallback(data);
        }, error => {
            console.log("failed:", error);
            toastr.error(this.props.errorMessage);
            this.props.onErrorCallback(data);
        });

    };

    setExpanded = () => {
        this.setState({expanded: true});
    };

    setCollapsed = () => {
        this.setState({expanded: false});
    };


    render() {
        let content = this.state.data || this.props.default;

        if (this.state.expanded == false) {
            return  (
                <div
                    style={{cursor: "pointer"}}
                    className={this.props.className}
                    onClick={this.setExpanded}>
                    { content }
                </div>
            );
        } else {
            return (
                <input
                    autoFocus
                    onBlur={this.handleDataChanged}
                    defaultValue={ content }/>
            );
        }
    }
};

module.exports = {
    AjaxTextInputUpdate: AjaxTextInputUpdate,
}
