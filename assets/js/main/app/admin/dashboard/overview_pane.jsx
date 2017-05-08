import {
    Row, Col, CardHeader,
    Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle,
} from 'reactstrap';

import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {Line as LineChart, Bar as BarChart} from 'react-chartjs';

import PropTypes from 'prop-types';
import moment from 'moment';

import {DatasetView} from 'components/dataset_view';

import adminUrls from 'main/app/admin/urls';
import {DATE_FORMAT} from 'main/app/admin/constants';

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

function enumerateDaysBetweenDatesInclusive(startDate, endDate) {
    let dates = [];

    let currDate = startDate.clone().startOf('day');
    dates.push(currDate.format(DATE_FORMAT));

    let lastDate = endDate.clone().startOf('day');

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        let clone = currDate.clone()
        let formattedClone = clone.format(DATE_FORMAT);
        dates.push(formattedClone);
    }

    dates.push(lastDate.format(DATE_FORMAT));
    return dates;
};

class MatchesPlayed extends DatasetView {
    get datasetViewName() {
        return "api-match-list";
    }
    get datasetStateAttr() {
        return "matches";
    }

    render() {
        if (this.getIsLoaded() == false) {
            return <div> Loading matches played...</div>;
        };

        let labels = [];

        //get the match_datetimes from matches
        let allMatchDatetimes = [];
        for (let match of this.state.matches) {
            let match_datetime = moment(match.match_datetime);
            allMatchDatetimes.push(match_datetime)
        }
        allMatchDatetimes = allMatchDatetimes.sort((l, r) => { return l-r });

        //build an array of the last month in days formatted as YYYY-MM-DD
        let startDate = moment().subtract(1, 'months'); //1 month ago
        let endDate = moment();
        let dateRange = enumerateDaysBetweenDatesInclusive(startDate, endDate);

        const data = dateRange.map((formattedDateStr) => {
            //add the formatted date to the labels
            labels.push(formattedDateStr);

            return allMatchDatetimes.reduce((total, el) => {

                if (el.format(DATE_FORMAT) == formattedDateStr) {
                    return total + 1;
                };

                return total;
            }, 0);
        });

        let chartData = {
            labels: labels,
            datasets: [{
                label: 'Matches Played',
                data: data,
                borderWidth: 1
            }]
        };

        let chartOptions = {
            responsive: true,
        };

        return <BarChart data={chartData} options={chartOptions} />
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
                    <div>
                        <h1> Overview</h1>

                        <h4> Matches played this month</h4>
                        <MatchesPlayed/>
                    </div>
                </Col>
            </Row>
        );
    }
}
