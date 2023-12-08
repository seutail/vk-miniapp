import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/onboarding.module.css'
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

const OnBoarding = props => (
    <Panel id={props.id}>
        <div className={styles.main}>
            <img className={styles.img} src="/main_smile.png" alt=""/>
            <h1 className={styles.text}>EmoTracker</h1>
        </div>
    </Panel>
);

OnBoarding.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default OnBoarding;
