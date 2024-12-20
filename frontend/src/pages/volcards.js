// import React, { useEffect, useState } from 'react';
// import { Typography, Box, Button } from '@mui/material';
// import '../index.css';
// import './volcards.css';
// import axios from 'axios';  // Import Axios for API calls

// function VolunteerMatchingForm({ eventId }) {  // Pass eventId as a prop to specify the event
//   // State to store event and volunteers fetched from the backend
//   const [volunteers, setVolunteers] = useState([]);
//   const [eventName, setEventName] = useState('');

//   // Fetch data from the backend when the component loads
//   useEffect(() => {
//     axios.get(`/api/volcards/${eventId}`)
//       .then((response) => {
//         setVolunteers(response.data.registeredVolunteers); // Set the volunteers in state
//         setEventName(response.data.name); // Set the event name in state
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, [eventId]);

//   return (
//     <div>
//       <main className="content">
//         <div className="container">
//           <h1>{eventName}</h1>  {/* Dynamically display event name */}
//           <p>Current Volunteers Registered to the Event</p>
//           <div className="view-switch">
//             <button className="card-active">Card View</button>
//             <button>Table View</button>
//           </div>
//           <section className="volunteer-cards">
//             {volunteers.map((volunteer, index) => (  // Map through volunteers fetched from API
//               <div className="card" key={index}>
//                 <div className="avatar"></div>
//                 <h3>{volunteer.firstName} {volunteer.lastName}</h3>
//                 <div className="tags">
//                   {volunteer.skills.map((skill, idx) => (
//                     <span key={idx}>{skill}</span>  // Display volunteer skills
//                   ))}
//                 </div>
//                 <p className="preferences">
//                   Preferences: {volunteer.preferences}
//                 </p>
//                 <div className="actions">
//                   <select name="event" className="event-selector">
//                     <option>Add to event</option>
//                   </select>
//                   <button className="remove-btn">Remove from event</button>
//                 </div>
//               </div>
//             ))}
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default VolunteerMatchingForm;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import './volcards.css';

function VolunteerMatchingForm() {
    const [volunteers, setVolunteers] = useState([]);
    const [eventName, setEventName] = useState('');

    const { eventId } = useParams();
    console.log("Extracted eventId from useParams:", eventId);

    useEffect(() => {
        if (!eventId) {
            console.error('No eventId provided to VolunteerMatchingForm');
            return;
        }

        axios.get(`http://localhost:4000/api/volcards/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })
            .then((response) => {
                setVolunteers(response.data.registeredVolunteers);
                setEventName(response.data.eventName);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [eventId]);

    return (
        <div>
            <main className="content">
                <div className="container">
                    <h1>{eventName}</h1> {/* Dynamically display event name */}
                    <p>Current Volunteers Registered to the Event</p>
                    <div className="view-switch">
                        <button className="card-active">Card View</button>
                        <button>Table View</button>
                    </div>
                    <section className="volunteer-cards">
                        {volunteers.map((volunteer, index) => (
                            <div className="card" key={index}>
                                <div className="avatar"></div>
                                <h3>{volunteer.firstName} {volunteer.lastName}</h3>
                                <div className="tags">
                                    {volunteer.skills.map((skill, idx) => (
                                        <span key={idx}>{skill}</span>
                                    ))}
                                </div>
                                <p className="preferences">
                                    Preferences: {volunteer.preferences}
                                </p>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default VolunteerMatchingForm;

