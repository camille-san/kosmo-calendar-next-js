import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCalendarDays,
    faCircle,
    faCircleHalfStroke,
    faMugHot,
    faUmbrellaBeach
} from '@fortawesome/free-solid-svg-icons'

export default function DayTable({day}) {

    const baseCSS = 'flex flex-row text-xs font-bold py-1.5 px-0 ';
    const WEEKEND = 'WEEKEND';
    const NATIONAL_HOLIDAY = 'NATIONAL_HOLIDAY';
    const PERSONAL_HOLIDAY = 'PERSONAL_HOLIDAY';
    const FULL_BUSY = 'FULL_BUSY';
    const HALF_BUSY_AM = 'HALF_BUSY_AM';
    const HALF_BUSY_PM = 'HALF_BUSY_PM';
    const FREE = 'FREE';

    function defineType() {
        const date = new Date(day.date);

        if (day.is_national_holiday) {
            return NATIONAL_HOLIDAY;
        }
        if (day.is_personal_holiday) {
            return PERSONAL_HOLIDAY;
        }
        if (day.is_am_busy) {
            if (day.is_pm_busy) {
                return FULL_BUSY;
            } else {
                return HALF_BUSY_AM;
            }
        } else {
            if (day.is_pm_busy) {
                return HALF_BUSY_PM;
            } else {
                if (date.getDay() === 6 || date.getDay() === 0) {
                    return WEEKEND;
                }
                return FREE;
            }
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.getDate();
    }

    function findClassColor() {
        return baseCSS + findColor();
    }

    function findColor() {
        const weekend = 'bg-gray-100 text-gray-800';
        const personalHoliday = 'bg-yellow-100 text-yellow-800';
        const nationalHoliday = 'bg-blue-100 text-blue-800';
        const full = 'bg-red-100 text-red-800';
        const half = 'bg-orange-100 text-orange-800';
        const free = 'bg-green-100 text-green-800';

        const dayType = defineType();

        if (dayType === PERSONAL_HOLIDAY) {
            return personalHoliday;
        }
        if (dayType === NATIONAL_HOLIDAY) {
            return nationalHoliday;
        }
        if (dayType === WEEKEND) {
            return weekend;
        }
        if (dayType === FULL_BUSY) {
            return full;
        }
        if (dayType === HALF_BUSY_AM || dayType === HALF_BUSY_PM) {
            return half;
        }
        return free;
    }

    function findIcon() {
        const dayType = defineType();

        if (dayType === PERSONAL_HOLIDAY) {
            return <FontAwesomeIcon icon={faUmbrellaBeach} size='sm'/>;
        }
        if (dayType === NATIONAL_HOLIDAY) {
            return <FontAwesomeIcon icon={faCalendarDays} size='sm'/>;
        }
        if (dayType === WEEKEND) {
            return <FontAwesomeIcon icon={faMugHot} size='sm'/>;
        }
        if (dayType === FULL_BUSY) {
            return <FontAwesomeIcon icon={faCircle} size='sm'/>;
        }
        if (dayType === HALF_BUSY_AM) {
            return <FontAwesomeIcon icon={faCircleHalfStroke} size='sm'/>;
        }
        if (dayType === HALF_BUSY_PM) {
            return <FontAwesomeIcon icon={faCircleHalfStroke} rotation={180} size='sm'/>;
        }
        return <p/>;
    }

    return (
        <div className={findClassColor()}>
            <div className={'basis-1/2 text-right'}>{formatDate(day.date)}</div>
            <div className={'basis-1/2'}>
                {findIcon()}
            </div>
        </div>
    );
}