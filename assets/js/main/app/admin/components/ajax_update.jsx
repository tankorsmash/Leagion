import React, { Component, PropTypes } from 'react';
import styles from './AjaxUpdate.css';

class AjaxUpdate extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.base}>
                
            </div>
        );
    }
}

export default AjaxUpdate;
