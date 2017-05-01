import {
    Row, Col, CardHeader,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
} from 'reactstrap';

class NotificationCard extends React.Component {
    render() {
        return (
            <Card inverse color="primary">
                <CardHeader>
                    <Row>
                        <div className="col-3"> <i className="fa fa-comments fa-5x"></i>
                        </div>
                        <div className="col-9 text-right">
                            <div className="huge">26</div>
                            <div>New Comments!</div>
                        </div>
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
            <div>
                <NotificationCard/>
            </div>
        );
    }
}
