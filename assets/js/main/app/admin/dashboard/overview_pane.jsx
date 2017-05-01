import {
    Row, Col, CardHeader,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
} from 'reactstrap';

import FontAwesome from 'react-fontawesome';

class NotificationCard extends React.Component {
    render() {
        return (
            <Card inverse color="primary">
                <CardHeader>
                    <Row>
                        <Col xs="3"> <FontAwesome name="comments" size="5x"/> </Col>
                        <Col xs="9" className="text-right">
                            <div className="display-4">26</div>
                            <div>New Comments!</div>
                        </Col>
                    </Row>
                </CardHeader>

                <a href="#">
                    <div className="card-footer">
                        <span className="float-left">View Details</span>
                        <span className="float-right"><i className="fa fa-arrow-circle-right"></i></span>
                        <div className="clearfix"></div>
                    </div>
                </a>
            </Card>
        );
    }
};

export class OverviewPane extends React.Component {
    render() {
        return (
            <Row className="d-flex justify-content-around">
                <NotificationCard/>
                <NotificationCard/>
                <NotificationCard/>
            </Row>
        );
    }
}
