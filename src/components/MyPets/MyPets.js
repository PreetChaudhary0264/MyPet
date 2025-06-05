import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.id || decoded._id;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    axios.get(`http://localhost:4000/api/v1/mypets/${userId}`, { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      withCredentials: true 
    })
    .then(res => {
      if (res.data.success) {
        setPets(res.data.pets);
      } else {
        setError("No pets found");
      }
    })
    .catch(() => setError("Error fetching pets"));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Pets</h2>
      {pets.length === 0 ? (
        <p>No pets registered yet.</p>
      ) : (
        pets.map(pet => (
          <div key={pet._id}>
            <h3>{pet.name}</h3>
            {/* other pet info */}
          </div>
        ))
      )}
    </div>
  );
}

export default MyPets;



