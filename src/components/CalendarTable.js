import {useEffect, useState} from "react";
import MonthTable from "@component/components/MonthTable";

export default function CalendarTable() {

    const years = [2022, 2023, 2024];
    const [year, setYear] = useState(2023);
    const [months, setMonths] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChange = (event) => {
        const value = event.target.value;
        setYear(value);
    };

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/days/' + year)
            .then((response) => response.json())
            .then((data) => {
                setMonths(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => setIsLoading(false));
    }, [year]);


    return (
        <div className={'text-center'}>
            <div className={'block mb-3'}>
                {isLoading && <p className={'text-bold'}>LOADING...</p>}
                <select onChange={onChange}
                        value={year}
                        className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {
                        years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))
                    }
                </select>
            </div>
            <div className={'grid grid-cols-3 gap-5'}>
                {months.map((month, index) => (
                    <div key={index}><MonthTable year={year} month={month.month} days={month.days}/></div>
                ))}
            </div>
        </div>
    );

}