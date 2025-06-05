import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PetDetails.css';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/petdetails/${id}`)
      .then(res => {
        if (res.data.success) {
          setPet(res.data.pet);
        } else {
          setError('Pet not found.');
        }
      })
      .catch(() => {
        setError('Error fetching pet data.');
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!pet) return <p>Loading...</p>;

  return (
    <div className="pet-details-container">
      <h2>{pet.name}</h2>
      <img src={`http://localhost:4000/${pet.profilePhoto}`} alt={pet.name} />
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      <p><strong>Bio:</strong> {pet.bio}</p>
      {pet.owner && (
        <div>
          {pet.owner.phone && <p><strong>Owner Phone:</strong> {pet.owner.phone}</p>}
          {pet.owner.email && <p><strong>Owner Email:</strong> {pet.owner.email}</p>}
        </div>
      )}
    </div>
  );
};

export default PetDetails;

