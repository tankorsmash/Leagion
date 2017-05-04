import {
    Row, Col, CardHeader,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
} from 'reactstrap';

import {Link} from 'react-router-dom';

import FontAwesome from 'react-fontawesome';

import PropTypes from 'prop-types';

import {DatasetView} from 'components/dataset_view';

import adminUrls from 'main/app/admin/urls';

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

                <Link to={this.props.actionHref}>
                    <div className="card-footer">
                        <span className="float-left">{ this.props.actionLine }</span>
                        <span className="float-right"><FontAwesome name="arrow-circle-right"/></span>
                        <div className="clearfix"></div>
                    </div>
                </Link>
            </Card>
        );
    }
};

NotificationCard.defaultProps = {
    count: 99,
    headline: "New Notifications!",
    actionLine: "View Details",
    actionHref: "#",
    iconName: "comments",
    color: "primary",
};

NotificationCard.propTypes = {
    count: PropTypes.number,
    headline: PropTypes.string,
    actionLine: PropTypes.string,
    actionHref: PropTypes.string,
    iconName: PropTypes.string,
    color: PropTypes.string,
};

class NotificationCards extends DatasetView {
    get datasetViewName() {
        return "api-stats-index";
    }

    render() {
        if (this.getIsLoaded() == false) {
            return <Row/>;
        };

        const stats = this.state.dataset;
        return (
            <Row className="d-flex justify-content-around align-items-stretch">
                <Col md="3">
                    <NotificationCard
                        count={stats.player_count}
                        headline="Players registered"
                        iconName="users"
                        color="info"/>
                </Col>
                <Col md="3">
                    <NotificationCard
                        count={stats.league_count}
                        actionHref={adminUrls.dashboard.leagues}
                        headline="Leagues created"
                        iconName="users" color="warning"/>
                </Col>
                <Col md="3">
                    <NotificationCard
                        count={stats.match_count}
                        headline="Matches played"
                        iconName="star"
                        color="success" />
                </Col>
                <Col md="3">
                    <NotificationCard
                        count={stats.team_count}
                        actionHref={adminUrls.dashboard.teams}
                        headline="Teams registered"
                        iconName="th-list" />
                </Col>
            </Row>
        );
    }
};

export class OverviewPane extends React.Component {
    render() {
        return (
            <Row>
                <Col>
                    <Row>
                        <Col> <NotificationCards/> </Col>
                    </Row>
                    <Row>
                        <Col> <h1> Overview</h1> </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
