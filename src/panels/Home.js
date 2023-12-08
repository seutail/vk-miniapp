import React from 'react';
import PropTypes from 'prop-types';

import { Panel } from '@vkontakte/vkui';
import styles from '../styles/home.module.css'

const items = [
	{ id: 1, path: '/mood1.svg' },
	{ id: 2, path: '/mood2.svg' },
	{ id: 3, path: '/mood3.svg' },
	{ id: 4, path: '/mood4.svg' },
	{ id: 5, path: '/mood5.svg', text: true },
	{ id: 6, path: '/mood6.svg' },
	{ id: 7, path: '/mood7.svg' },
	{ id: 8, path: '/mood8.svg' },
	{ id: 9, path: '/mood9.svg' },
]


const Home = ({ id, go, setActiveMood, setActivePanel }) => {
	const handleClick = (item) => {
		setActiveMood(item)
		setActivePanel('ask');
	}

	return (
		<Panel id={id}>
			<div className={styles.main}>
				<div className={styles.root}>
					{items.map((item) => (
						<div key={item.id} className={item.text ? styles.itemText : styles.item}>
							{item.text ? <p className={styles.heading}>какое у вас настроение сегодня?</p> :
								<img onClick={() => handleClick(item.id)} className={styles.img} src={item.path} alt=""/>}
						</div>
					))}
				</div>
			</div>
		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
