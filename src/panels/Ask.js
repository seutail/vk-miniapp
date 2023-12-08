import {Panel} from "@vkontakte/vkui";
import styles from '../styles/ask.module.css'
const Ask = ({ id, go, activeMood, setActivePanel }) => {
    function getFormattedDate() {
        const currentDate = new Date();

        // Получаем день и месяц
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;

        const formattedDay = (day < 10) ? `0${day}` : day;
        const formattedMonth = (month < 10) ? `0${month}` : month;

        const formattedDate = `${formattedDay}.${formattedMonth}`;

        return formattedDate;
    }
    return (
        <Panel id={id}>
            <div className={styles.root}>
                <div className={styles.header}>
                    <svg onClick={() => setActivePanel('home')} className={styles.back} xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.9591 4.48062C15.5222 5.01054 15.549 5.89657 15.0191 6.45961L7.92216 14.0001L15.0191 21.5406C15.549 22.1036 15.5222 22.9897 14.9591 23.5196C14.3961 24.0495 13.5101 24.0227 12.9801 23.4596L4.98013 14.9596C4.47277 14.4205 4.47277 13.5797 4.98013 13.0406L12.9801 4.54059C13.5101 3.97755 14.3961 3.9507 14.9591 4.48062Z" fill="#549853"/>
                    </svg>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.block}>
                        {getFormattedDate()}
                    </div>
                    <img className={styles.img} src={"/mood" + activeMood + ".svg"} alt=""/>
                    <textarea className={styles.textarea}></textarea>
                </div>
            </div>
        </Panel>
    );
};

export default Ask;