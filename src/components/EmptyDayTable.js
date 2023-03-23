export default function EmptyDayTable() {

    const baseCSS = 'flex flex-row text-xs font-bold py-1.5 px-0 ';

    function findClassColor() {
        return baseCSS + 'bg-white text-white';
    }

    return (
        <div className={findClassColor()}>
            <p>.</p>
            <p>.</p>
        </div>
    );
}