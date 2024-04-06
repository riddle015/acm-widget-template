import { useEffect, useState } from 'react';
import './widget.css';

function Widget({ apiUrl }) {
  const [count, setCount] = useState(0);
  const [isEven, setIsEven] = useState(true);
  const [attendees, setAttendees] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname]  = useState('');
  const [linkedin, setLinkedin]  = useState('');
  const [role, setRole] = useState('');

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`${apiUrl}/attendees`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: event.target[0].value,
            lastname: event.target[1].value,
            linkedin: event.target[2].value,
            role: event.target[3].value,
          })
        });


        const data = await res.json();
        console.log(data)
        // Set the data from the server
        setFirstname(data['firstname']);
        setLastname(data['lastname']);
        setLinkedin(data['linkedin']);
        setRole(data['role']);

        console.log('Button hit');


    }

    return (
        <div className="wrapper-no-remove">
            <div className="widget-no-remove scrollbar-no-remove">
                <form
                  className="form-container"
                  onSubmit={handleSubmit}
                >
                  <div className="form-class">
                    <label htmlFor="firstname">First name:</label>
                    <input name="firstname" />
                    
                    <label htmlFor="lastname">Last name:</label>
                    <input name="lastname" />
                                       
                    <label htmlFor="linkedin">LinkedIn url:</label>
                    <input name="linkedin" />
                  
                    <label htmlFor="role">Role: </label>
                    <input name="role" />
                  </div>  
                  <button>Submit</button>
                </form>
                {firstname ? <div>
                  <div>
                  Firstname: {firstname}
                  </div>
                  <div>
                  Lastname: {lastname}
                  </div>
                  <div>
                    Linkedin: {linkedin}
                  </div>
                  <div>
                    Role: {role}
                  </div>
                  
                </div>
                : <></>}
            </div>
        </div>
    );
}

export default Widget;
