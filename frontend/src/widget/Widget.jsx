import { useEffect, useState } from 'react';
import './widget.css';

function Widget({ apiUrl }) {
    const [count, setCount] = useState(0);
    const [isEven, setIsEven] = useState(true);

    const [attendees, setAttendees] = useState(null);

    useEffect(() => {
        async function fetchIsEven() {
            const response = await fetch(`${apiUrl}/isEven`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ num: count }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsEven(data.isEven);
            }
        }

        fetchIsEven();
    }, [count]);

    useEffect(() => {
        async function fetchAttendees() {
            const response = await fetch(`${apiUrl}/attendees`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setAttendees(data);
            }
        }

        fetchAttendees();
    }, []);

    return (
        <div className="wrapper-no-remove">
            <div className="widget-no-remove scrollbar-no-remove">
                <h1>Hello Widget</h1>
                <button onClick={() => setCount(count + 1)} className="btn">
                    Count: {count}
                </button>
                <h5>Count is {isEven ? 'even' : 'odd'}</h5>
                <h5>First attendee: {attendees && attendees[0].firstname}</h5>
                <h5>Attendee count: {attendees && attendees.length}</h5>
            </div>
        </div>
    );
}

export default Widget;
