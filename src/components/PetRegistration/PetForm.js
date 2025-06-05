import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PetForm.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//for my-pets
const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user);



const PetForm = () => {
  const [pet, setPet] = useState({
    name: '',
    breed: '',
    age: '',
    bio: '',
    photo: null,
    photoPreview: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // if(!user){
  // alert("please login first")
  // navigate('/signup');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };




  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPet({
          ...pet,
          photo: file,
          photoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('name', pet.name);
    formData.append('breed', pet.breed);
    formData.append('age', pet.age);
    formData.append('bio', pet.bio);
    formData.append('profilephoto', pet.photo);
    formData.append("owner", user._id); // 👈 Send owner's ID


    try {
      const res = await axios.post("http://localhost:4000/api/v1/register", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user}`
        },
      });

      if (res.data.success) {
        const registeredPet = res.data.pet;
        const qrUrl = `http://localhost:3000/petdetails/${registeredPet._id}`;

        const reader = new FileReader();
        reader.onloadend = () => {
          const petData = {
            ...registeredPet,
            photoPreview: reader.result
          };

          toast.success("Pet registered! Redirecting to QR generation...", {
            position: "top-center",
            autoClose: 2000
          });

          setTimeout(() => {
            navigate('/generate-qr', {
              state: {
                pet: petData,
                qrUrl
              }
            });
          }, 2000);
        };

        if (pet.photo) {
          reader.readAsDataURL(pet.photo);
        }

        // Reset form
        setPet({
          name: '',
          breed: '',
          age: '',
          bio: '',
          photo: null,
          photoPreview: ''
        });
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  // const goToQR = () => {
  //  navigate('/generate-qr', { state: { pet: res.data.pet } },2000);

  // };

  return (
    <div className="pet-form-container">
      <h2>Create Pet Profile</h2>
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Photo */}
        <div className="form-group photo-upload">
          <label>
            Profile Photo*
            <div className="photo-preview">
              {pet.photoPreview ? (
                <img src={pet.photoPreview} alt="Pet preview" />
              ) : (
                <div className="photo-placeholder">No photo selected</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              required
            />
          </label>
        </div>

        {/* Name, Breed, Age, Bio */}
        <div className="form-group">
          <label>Pet Name*</label>
          <input name="name" value={pet.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Breed*</label>
          <input name="breed" value={pet.breed} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age*</label>
          <input name="age" type="number" value={pet.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Short Bio</label>
          <textarea name="bio" value={pet.bio} onChange={handleChange} rows="3" />
        </div>

        <button type="submit" className="submit-btn">
          Register Pet
        </button>
      </form>

  <ToastContainer />
    </div>
    

  );
};


export default PetForm;
