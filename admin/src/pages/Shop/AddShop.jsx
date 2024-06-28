import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {assets} from '../../assets/assets'
import { toast } from 'react-toastify';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AddShop = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    address: '',
    description: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    const loadScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('Google Maps script loaded');
        };
        document.head.appendChild(script);
      } else {
        console.log('Google Maps script already loaded');
      }
    };

    loadScript();
  }, []);

  const handleAddressChange = (address) => {
    setData((prevData) => ({ ...prevData, address }));
  };

  const handleAddressSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setData((prevData) => ({
      ...prevData,
      address,
      lat: latLng.lat,
      lng: latLng.lng,
    }));
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('description', data.description);
    formData.append('lat', Number(data.lat));
    formData.append('lng', Number(data.lng));
    formData.append('image', image);
    formData.append('rating', Number(data.rating));
    const response = await axios.post(`${url}/api/coffee-shops/add`, formData);
    console.log('Response:', response);
    console.log(response.data.success);
    if (response.data.success) {
      setData({ 
        name: '',
        address: '', 
        description: '', 
        lat: '', 
        lng: '', 
        rating: '' });
      setImage(false)
      toast.success(response.data.message)
  }  
  else {
    
    toast.error(response.data.message)
  }

  };

  return (
    <div className='w-9/12 ml-6 mt-12 px-10 text-base text-[#083344] pb-20 '>
      <form className='gap-5 flex flex-col' onSubmit={onSubmitHandler}>
      <div className=' w-32 flex flex-col gap-3'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className='w-72 flex flex-col gap-3'>
          <p>Shop Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            className='p-3 border'
            type='text'
            name='name'
            placeholder='Shop name'
            required
          />
        </div>
        <div className='w-72 flex flex-col gap-3'>
          <p>Address</p>
          <PlacesAutocomplete
            value={data.address}
            onChange={handleAddressChange}
            onSelect={handleAddressSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'p-3 border',
                  })}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className='w-72 flex flex-col gap-3'>
          <p>Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            className='p-3 border'
            name='description'
            rows='4'
            placeholder='Description'
          ></textarea>
        </div>
        <div className='w-72 flex flex-col gap-3'>
          <p>Latitude</p>
          <input
            onChange={onChangeHandler}
            value={data.lat}
            className='p-3 border'
            type='number'
            name='lat'
            placeholder='Latitude'
            required
          />
        </div>
        <div className='w-72 flex flex-col gap-3'>
          <p>Longitude</p>
          <input
            onChange={onChangeHandler}
            value={data.lng}
            className='p-3 border'
            type='number'
            name='lng'
            placeholder='Longitude'
            required
          />
        </div>
        <div className='w-72 flex flex-col gap-3'>
          <p>Rating</p>
          <input
            onChange={onChangeHandler}
            value={data.rating}
            className='p-3 border'
            type='number'
            name='rating'
            placeholder='Rating (1-5)'
            min='1'
            max='5'
            step='0.1'
            required
          />
        </div>
        <button type='submit' className='lg:w-32 border-none p-3 bg-black text-white cursor-pointer'>
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddShop;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { assets } from '../../assets/assets';
// import LocationPicker from '../../components/LocationPicker/LocationPicker'

// const AddCoffeeShop = ({ url }) => {
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     name: '',
//     address: '',
//     description: ''
//   });
//   const [location, setLocation] = useState({ lat: 0, lng: 0 });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('address', data.address);
//     formData.append('description', data.description);
//     formData.append('image', image);
//     formData.append('lat', location.lat);
//     formData.append('lng', location.lng);

//     try {
//       const response = await axios.post(`${url}/api/coffee-shops/add`, formData);
//       if (response.data.success) {
//         setData({
//           name: '',
//           address: '',
//           description: ''
//         });
//         setImage(false);
//         setLocation({ lat: 0, lng: 0 });
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding coffee shop:', error);
//       toast.error('Failed to add coffee shop');
//     }
//   };

//   return (
//     <div className='w-9/12 ml-6 mt-12 text-[#6d6d6d] text-base'>
//       <form className='gap-5 flex flex-col' onSubmit={onSubmitHandler}>
//         <div className='w-32 flex flex-col gap-3'>
//           <p>Upload Image</p>
//           <label htmlFor='image'>
//             <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
//           </label>
//           <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
//         </div>
//         <div className='w-72 flex flex-col gap-3'>
//           <p>Name</p>
//           <input onChange={onChangeHandler} value={data.name} className='p-3 border' type='text' name='name' placeholder='Type here' required />
//         </div>
//         <div className='w-72 flex flex-col gap-3'>
//           <p>Address</p>
//           <input onChange={onChangeHandler} value={data.address} className='p-3 border' type='text' name='address' placeholder='Type here' required />
//         </div>
//         <div className='w-72 flex flex-col gap-3'>
//           <p>Description</p>
//           <textarea onChange={onChangeHandler} value={data.description} className='p-3 border' name='description' rows='6' placeholder='Write here'></textarea>
//         </div>
//         <div className='w-72 flex flex-col gap-3'>
//           <p>Location</p>
//           <LocationPicker setLocation={setLocation} />
//         </div>
//         <button type='submit' className='lg:w-32 border-none p-3 bg-black text-white cursor-pointer'>ADD</button>
//       </form>
//     </div>
//   );
// };

// export default AddCoffeeShop;
