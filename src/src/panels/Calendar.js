import { Panel } from "@vkontakte/vkui";
import { Fragment, useEffect, useState } from "react";
import { DateTime } from "luxon";
import bridge from "@vkontakte/vk-bridge";

const CalendarPage = ({ id, activeMood, activeDays }) => {
  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const [moods, setMoods] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(DateTime.now());

  const daysInMonth = currentMonth.daysInMonth;
  const firstDayOfMonth = currentMonth.set({ day: 1 });
  const startingDayOfWeek = firstDayOfMonth.weekday;

  const weeks = [];
  let currentWeek = [];

  for (let i = 1; i < startingDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const prevMonth = () => {
    setCurrentMonth(currentMonth.minus({ months: 1 }));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.plus({ months: 1 }));
  };

  const isToday = (day) => {
    const today = DateTime.now();
    return (
      day === today.day &&
      currentMonth.year === today.year &&
      currentMonth.month === today.month
    );
  };

  const getMoodForDate = (day, currentMonth) => {
    const formattedDate = DateTime.fromObject({
      day: parseInt(day, 10),
      month: currentMonth.month,
      year: currentMonth.year,
    }).toFormat("dd_MM_yyyy");

    const matchingDay = moods.find((item) => item.date === formattedDate);

    return matchingDay ? matchingDay.mood : null;
  };

  useEffect(() => {
    bridge
      .send("VKWebAppStorageGet", {
        keys: activeDays,
      })
      .then((data) => {
        if (data.keys) {
          setMoods(data.keys.map((item) => JSON.parse(item.value)));
        }
      });
  }, [activeDays]);

  console.log(moods);

  return (
    <Panel id={id}>
      <div className="w-screen h-screen bg-white flex flex-col items-center p-[20px]">
        <div className="bg-[#549853] text-white rounded-[10px] py-[10px] px-[20px] flex justify-between w-[170px]">
          <span onClick={prevMonth}>{"<"}</span>
          <span className="uppercase">
            {currentMonth.toFormat("MMM", { locale: "ru-RU" })}
          </span>
          <span onClick={nextMonth}>{">"}</span>
        </div>

        <div className="grid grid-cols-7 gap-4 w-full border-b border-solid border-[#549853] mb-[20px] pb-[5px] mt-[30px]">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-[#939393] uppercase ">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4 w-full">
          {weeks.map((week, index) => (
            <Fragment key={index}>
              {week.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center flex-col text-[#939393]"
                >
                  {day !== null && (
                    <>
                      <span
                        className={
                          isToday(day)
                            ? "text-white bg-[#549853] rounded-[10px] mb-[6px] px-[6px]"
                            : "mb-[6px]"
                        }
                      >
                        {day}
                      </span>
                      <div
                        className={
                          "w-[42px] h-[42px] rounded-full bg-[#EBEAEA] flex items-center justify-center text-black" +
                          (isToday(day)
                            ? " border-2 border-solid border-[#549853]"
                            : "")
                        }
                      >
                        {activeMood && isToday(day) ? (
                          <img
                            className={"w-full h-full"}
                            src={"/mood" + activeMood + ".svg"}
                            alt=""
                          />
                        ) : null}

                        {getMoodForDate(day, currentMonth) && (
                          <img
                            src={
                              "/mood" +
                              getMoodForDate(day, currentMonth) +
                              ".svg"
                            }
                            alt=""
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </div>

        <div></div>
      </div>
    </Panel>
  );
};

export default CalendarPage;
