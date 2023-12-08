import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import OnBoarding from "./panels/Onboarding";
import Ask from "./panels/Ask";

const App = () => {
	const [activePanel, setActivePanel] = useState('onboarding');
	const [activeMood, setActiveMood] = useState(0);

	useEffect(() => {
		const next = () => {
			setTimeout(() => {
				setActivePanel('home')
			}, 2000)
		}

		if (activePanel === 'onboarding') {
			next();
		}
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout >
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' go={go} setActiveMood={setActiveMood} setActivePanel={setActivePanel} />
								<OnBoarding id='onboarding' go={go} />
								<Ask id='ask' go={go} activeMood={activeMood} setActivePanel={setActivePanel}/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
