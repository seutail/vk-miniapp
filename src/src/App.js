import React, { useEffect, useState } from "react";
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./styles/globals.css";

import Home from "./panels/Home";
import OnBoarding from "./panels/Onboarding";
import Ask from "./panels/Ask";
import Templates from "./panels/Templates";
import CalendarPage from "./panels/Calendar";
import bridge from "@vkontakte/vk-bridge";
import { DateTime } from "luxon";

const App = () => {
  const [activePanel, setActivePanel] = useState("onboarding");
  const [activeMood, setActiveMood] = useState(0);
  const [activeText, setActiveText] = useState("");
  const [activeDays, setActiveDays] = useState([]);

  useEffect(() => {
    const next = async () => {
      bridge.send("VKWebAppStorageSet", {
        key: "11_12_2023",
        value: "",
      });
      bridge
        .send("VKWebAppStorageGetKeys", {
          count: 40,
          offset: 0,
        })
        .then((res) => {
          if (res.keys) {
            const today = DateTime.now();
            const isTodayInArray = res.keys.some((dateString) => {
              const dateObject = DateTime.fromFormat(dateString, "dd_MM_yyyy");
              return dateObject.hasSame(today, "day");
            });
            setActiveDays(res.keys);

            if (isTodayInArray) {
              setActivePanel("calendar");
            } else {
              setActivePanel("home");
            }
          } else {
            setActivePanel("home");
            console.log("home");
          }
        });
    };

    if (activePanel === "onboarding") {
      next();
    }
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home
                  id="home"
                  go={go}
                  setActiveMood={setActiveMood}
                  setActivePanel={setActivePanel}
                />
                <OnBoarding id="onboarding" go={go} />
                <Ask
                  id="ask"
                  go={go}
                  activeMood={activeMood}
                  setActivePanel={setActivePanel}
                  activeText={activeText}
                  setActiveText={setActiveText}
                />
                <Templates
                  id="templates"
                  setActivePanel={setActivePanel}
                  activeMood={activeMood}
                  activeText={activeText}
                  setActiveText={setActiveText}
                />
                <CalendarPage
                  id="calendar"
                  activeMood={activeMood}
                  activeDays={activeDays}
                />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
