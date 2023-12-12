import { Panel } from "@vkontakte/vkui";
import styles from "../styles/ask.module.css";

const data = [
  {
    id: 1,
    title: "Мысли перед сном",
  },
  {
    id: 2,
    title: "Перестать себя накручивать из-за случившейся ситуации",
  },
  {
    id: 3,
    title: "Позаботься о себе",
  },
  {
    id: 4,
    title: "Событие",
  },
  {
    id: 5,
    title: "Воление",
  },
  {
    id: 6,
    title: "Мысли утром",
  },
  {
    id: 7,
    title: "Общение с самим собой",
  },
];

const Templates = ({
  id,
  setActivePanel,
  activeMood,
  activeText,
  setActiveText,
}) => {
  function getFormattedDate() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}.${formattedMonth}`;

    return formattedDate;
  }

  return (
    <Panel id={id}>
      <div className={styles.root + " overflow-y-scroll overflow-x-hidden"}>
        <div className={styles.header + " flex justify-between"}>
          <svg
            onClick={() => setActivePanel("ask")}
            className={styles.back}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.9591 4.48062C15.5222 5.01054 15.549 5.89657 15.0191 6.45961L7.92216 14.0001L15.0191 21.5406C15.549 22.1036 15.5222 22.9897 14.9591 23.5196C14.3961 24.0495 13.5101 24.0227 12.9801 23.4596L4.98013 14.9596C4.47277 14.4205 4.47277 13.5797 4.98013 13.0406L12.9801 4.54059C13.5101 3.97755 14.3961 3.9507 14.9591 4.48062Z"
              fill="#549853"
            />
          </svg>
          <div
            className={"px-[20px] py-[10px] bg-[#549853] text-white ml-[-40px]"}
          >
            Шаблоны
          </div>
          <div></div>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.block}>{getFormattedDate()}</div>
          <img
            className={styles.img}
            src={"/mood" + activeMood + ".svg"}
            alt=""
          />
          <textarea
            value={activeText}
            onChange={(e) => setActiveText(e.target.value)}
            className={styles.textarea}
          ></textarea>
        </div>

        <div
          className={"flex flex-col justify-start w-full gap-[10px] pt-[20px]"}
        >
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveText((prev) => prev + "\n" + item.title)}
              className={
                "rounded-[20px] border border-[#549853] text-[#549853] px-[20px] py-[10px] cursor-pointer hover:bg-[#549853] hover:text-white"
              }
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};

export default Templates;
