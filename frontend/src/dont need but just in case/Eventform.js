// // src/EventForm.js
// import React from 'react';

// function EventForm() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-red-200">
//       <div className="w-full max-w-4xl p-6 bg-white border-2 border-red-200 rounded-lg shadow-lg mt-7">
//         <h2 className="mb-5 text-2xl font-bold text-center text-red-500">Event Management Form</h2>
//         <form>
//           {/* Event Name */}
//           <div className="mb-4">
//             <label htmlFor="event-name" className="block mb-2 font-bold">Event Name</label>
//             <input
//               type="text"
//               id="event-name"
//               name="event-name"
//               placeholder="Enter event name here"
//               className="w-full px-3 py-2 border rounded-md bg-gray-100"
//             />
//           </div>

//           {/* Event Description */}
//           <div className="mb-4">
//             <label htmlFor="event-description" className="block mb-2 font-bold">Event Description</label>
//             <textarea
//               id="event-description"
//               name="event-description"
//               rows="5"
//               placeholder="Enter event description here"
//               className="w-full px-3 py-2 border rounded-md bg-gray-100 resize-none"
//             ></textarea>
//           </div>

//           {/* Event Location */}
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Event Location</label>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <input
//                 type="text"
//                 id="address1"
//                 name="address1"
//                 placeholder="Address 1 *"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-100"
//               />
//               <input
//                 type="text"
//                 id="address2"
//                 name="address2"
//                 placeholder="Address 2 *"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-100"
//               />
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 placeholder="City *"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-100"
//               />
//               <select
//                 name="state"
//                 id="state"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-100"
//               >
//                 <option value="">Select State</option>
//                 {/* Add the rest of the states here */}
//                 <option value="AL">Alabama</option>
//                 <option value="AK">Alaska</option>
//                 {/* ... */}
//                 <option value="WY">Wyoming</option>
//               </select>
//               <input
//                 type="number"
//                 id="zipcode"
//                 name="zipcode"
//                 placeholder="Zipcode *"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* Required Skills */}
//           <div className="mb-4">
//             <label htmlFor="skills" className="block mb-2 font-bold">Select Required Skills</label>
//             <select
//               name="skills"
//               id="skills"
//               multiple
//               className="w-full px-3 py-2 border rounded-md bg-gray-100"
//             >
//               <option value="skill1">Skill 1</option>
//               <option value="skill2">Skill 2</option>
//               <option value="skill3">Skill 3</option>
//               <option value="skill4">Skill 4</option>
//               <option value="skill5">Skill 5</option>
//             </select>
//           </div>

//           {/* Urgency */}
//           <div className="mb-4">
//             <label htmlFor="urgency" className="block mb-2 font-bold">Select Urgency</label>
//             <select
//               name="urgency"
//               id="urgency"
//               className="w-full px-3 py-2 border rounded-md bg-gray-100"
//             >
//               <option value="urgency1">Low Priority</option>
//               <option value="urgency2">Medium Priority</option>
//               <option value="urgency3">High Priority</option>
//             </select>
//           </div>

//           {/* Date and Time */}
//           <div className="mb-6">
//             <label className="block mb-2 font-bold">Date and Time of Event</label>
//             <div className="flex flex-col gap-4 md:flex-row">
//               <input
//                 type="date"
//                 name="event-date"
//                 id="event-date"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-100"
//               />
//               <input
//                 type="time"
//                 name="event-time"
//                 id="event-time"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full px-4 py-3 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
//           >
//             Complete
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EventForm;