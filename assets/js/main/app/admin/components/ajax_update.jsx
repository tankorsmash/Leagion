import ajax from 'common/ajax';

class AjaxTextInputUpdate extends React.Component {
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
            toastr.success("Season updated!");
        }, error => {
            console.log("failed:", error);
            toastr.error("Season update failed, please try again.");
        });

    };

    setExpanded() {
        this.setState({expanded: true});
    };

    setCollapsed() {
        this.setState({expanded: false});
    };


    render() {
        if (this.state.expanded == false) {
            return  (
                <div onClick={this.setExpanded}>
                    { this.state.data }
                </div>
            );
        } else {
            return (
                <input
                    onBlur={this.handleDataChanged}
                    defaultValue={ this.state.data }/>
            );
        }
    }
};

module.exports = {
    AjaxTextInputUpdate: AjaxTextInputUpdate,
}
