import DayTable from "@component/components/DayTable";
import EmptyDayTable from "@component/components/EmptyDayTable";

export default function MonthTable({year, month, days}) {

    const weeksDays = [
        'M',
        'T',
        'W',
        'T',
        'F',
        'S',
        'S',
    ];

    function findMonthName(index) {
        const names = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return names[index] + " " + year;
    }

    function parseByWeeks() {
        let weeks = [];
        for (let i = 1; i <= (6 * 7); i++) {
            weeks.push('x');
        }

        // 1. We look for first Monday
        let firstOfMonthIsMonday = false;
        let indexOfFirstMonday = 0;
        for (let i = 0; i < days.length; i++) {
            const date = new Date(days[i].date);
            if (date.getDay() === 1) {
                indexOfFirstMonday = i;
                if (i === 0) {
                    firstOfMonthIsMonday = true;
                }
                break;
            }
        }

        if (firstOfMonthIsMonday) {
            // 2. First Monday is mapped in the weeks grid
            for (let i = 0; i < days.length; i++) {
                weeks[i] = days[i];
            }
        } else {
            // 2. First Monday is mapped in the weeks grid
            let i, j;
            for (i = 7, j = indexOfFirstMonday; i < weeks.length , j < days.length; i++, j++) {
                weeks[i] = days[j];
            }

            // 3. we add the days anterior the first monday
            let k, l
            for (k = 6, l = indexOfFirstMonday - 1; k >= 0, l >= 0; k--, l--) {
                weeks[k] = days[l];
            }
        }

        // 4. We order everything 1 week = 1 array
        let weeksByWeeks = [
            [],
            [],
            [],
            [],
            [],
            []
        ];

        let index = 0; // index of all days of the month
        for (let a = 0; a < 6; a++) { // week
            for (let b = 0; b < 7; b++) { // day of week
                weeksByWeeks[a][b] = weeks[index];
                index++;
            }
        }
        return weeksByWeeks;
    }

    return (
        <div
            className={'block w-full p-3 bg-white border border-gray-200 rounded-lg shadow justify-center text-center'}>
            <h1 className={'font-bold text-gray-700 text-xl'}>{findMonthName(month)}</h1>
            <table className={'w-full'}>
                <thead>
                <tr>
                    {
                        weeksDays.map((weekDay, index) => (
                            <th key={index} className={'px-2 py-2 w-16 text-gray-400 text-sm'}>{weekDay}</th>
                        ))}
                </tr>
                </thead>
                <tbody>
                {
                    parseByWeeks().map((week, index) => (
                        <tr key={index}>
                            {
                                week.map((day, index) => (
                                    <td key={index}>
                                        {day === 'x' ? <EmptyDayTable/> : <DayTable day={day}/>}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}