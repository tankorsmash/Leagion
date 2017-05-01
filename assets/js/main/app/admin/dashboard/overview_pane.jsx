import {
    Row, Col, CardHeader,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
} from 'reactstrap';

import FontAwesome from 'react-fontawesome';

import PropTypes from 'prop-types';

class NotificationCard extends React.Component {
    render() {
        return (
            <Card inverse color={ this.props.color }>
                <CardHeader>
                    <Row>
                        <Col xs="3"> <FontAwesome name={ this.props.iconName } size="5x"/> </Col>
                        <Col xs="9" className="text-right">
                            <div className="display-4">{ this.props.count }</div>
                            <div>{ this.props.headline }</div>
                        </Col>
                    </Row>
                </CardHeader>

                <a href="#">
                    <div className="card-footer">
                        <span className="float-left">{ this.props.actionLine }</span>
                        <span className="float-right"><FontAwesome name="arrow-circle-right"/></span>
                        <div className="clearfix"></div>
                    </div>
                </a>
            </Card>
        );
    }
};

NotificationCard.defaultProps = {
    count: 99,
    headline: "New Notifications!",
    actionLine: "View Details",
    iconName: "comments",
    color: "primary",
};

NotificationCard.propTypes = {
    count: PropTypes.number,
    headline: PropTypes.string,
    actionLine: PropTypes.string,
    iconName: PropTypes.string,
    color: PropTypes.string,
};

export class OverviewPane extends React.Component {
    render() {
        return (
            <Row className="d-flex justify-content-around">
                <NotificationCard color="info"/>
                <NotificationCard color="success" />
                <NotificationCard count={12}/>
            </Row>
        );
    }
}
