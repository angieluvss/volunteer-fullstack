// src/utils/fetchProfileStatus.js
import axios from 'axios';

export const fetchProfileStatus = async (setRole, setVolunteerFormCompleted) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found in local storage');

    // Fetch user role
    const userResponse = await axios.get('http://localhost:4000/api/auth/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { role } = userResponse.data;

    // Update role state
    setRole(role);
    localStorage.setItem('role', role);

    if (role === 'admin') {
        return null; // For admins, simply return early
    }

    // If the role is 'volunteer', fetch the volunteer profile
    if (role === 'volunteer') {
      const profileResponse = await axios.get('http://localhost:4000/api/volunteers/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { volunteerFormCompleted } = profileResponse.data;

      // Update volunteer form completion status
      setVolunteerFormCompleted(volunteerFormCompleted);
      localStorage.setItem('volunteerFormCompleted', volunteerFormCompleted);

      return volunteerFormCompleted;
    }

    return null; // Return null for admin or other roles
  } catch (error) {
    console.error('Error fetching profile status:', error);
    throw error;
  }
};
