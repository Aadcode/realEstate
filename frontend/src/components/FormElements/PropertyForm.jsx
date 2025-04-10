import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    propertyType: "",
    propertyStatus: "For Sale",
    maxRooms: 1,
    beds: 1,
    baths: 1,
    price: "",
    description: "",
    address: "",
    zipCode: "",
    area: "",
    city: "",
    state: "",
    images: [],
    selectedFeatures: []
  });

  const features = [
    { id: 1, name: "Emergency Exit" },
    { id: 2, name: "CCTV" },
    { id: 3, name: "Free Wi-Fi" },
    { id: 4, name: "Free Parking In The Area" },
    { id: 5, name: "Air Conditioning" },
    { id: 6, name: "Security Guard" },
    { id: 7, name: "Terrace" },
    { id: 8, name: "Laundry Service" },
    { id: 9, name: "Elevator Lift" },
    { id: 10, name: "Balcony" }
  ];

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20MB total

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas dimensions to 800px width while maintaining aspect ratio
          const maxWidth = 800;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Convert to JPEG with 80% quality
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            }));
          }, 'image/jpeg', 0.8);
        };
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setPropertyData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter(item => item !== feature)
        : [...prev.selectedFeatures, feature]
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // Check total size
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error(`Total file size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)}MB limit`);
      return;
    }

    // Process each file
    const processedFiles = [];
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        // Compress large files
        const compressedFile = await compressImage(file);
        processedFiles.push(compressedFile);
      } else {
        processedFiles.push(file);
      }
    }

    setPropertyData(prev => ({
      ...prev,
      images: [...prev.images, ...processedFiles]
    }));
  };

  const removeImage = (index) => {
    setPropertyData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!propertyData.propertyType || 
        !propertyData.description || 
        !propertyData.address || 
        !propertyData.city || 
        !propertyData.state || 
        !propertyData.price || 
        propertyData.images.length === 0) {
      toast.error("Please fill in all required fields and upload at least one image");
      return;
    }
    
    // Check if total size exceeds limit
    const totalSize = propertyData.images.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error(`Total file size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)}MB limit`);
      return;
    }

    const formData = new FormData();
    
    // Convert propertyStatus to match backend enum format
    const status = propertyData.propertyStatus.toUpperCase().replace(' ', '_');
    
    // Add all property data to formData according to backend requirements
    formData.append('title', `${propertyData.propertyType}`);
    formData.append('description', propertyData.description);
    formData.append('status', status);
    formData.append('address', propertyData.address);
    formData.append('city', propertyData.city);
    formData.append('state', propertyData.state);
    formData.append('price', propertyData.price);
    formData.append('zipCode', 112324);
    formData.append('userId', localStorage.getItem('userId') || '1'); // Get from auth context or localStorage
    
    // Handle multiple images
    propertyData.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/property", 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        toast.success("Property added successfully!");
        // Reset form
        setPropertyData({
          propertyType: "",
          propertyStatus: "For Sale",
          maxRooms: 1,
          beds: 1,
          baths: 1,
          price: "",
          description: "",
          address: "",
          area: "",
          city: "",
          state: "",
          images: [],
          selectedFeatures: []
        });
      }
    } catch (error) {
      console.error("Error adding property:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Error adding property. Please try again.");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("Error setting up the request. Please try again.");
      }
    }
  };

  const inputStyle = "w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1.5";
  const sectionStyle = "bg-white p-6 rounded-lg shadow-sm mb-6";
  const sectionTitleStyle = "text-lg font-semibold text-gray-800 mb-4";
  const buttonStyle = "w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 font-medium transition-colors";

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Property Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Property Type</label>
            <select
              name="propertyType"
              value={propertyData.propertyType}
              onChange={handleInputChange}
              className={inputStyle}
            >
              <option value="">Select property type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
            </select>
          </div>

          <div>
            <label className={labelStyle}>Property Status</label>
            <select
              name="propertyStatus"
              value={propertyData.propertyStatus}
              onChange={handleInputChange}
              className={inputStyle}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>
        </div>
      </div>

      <div className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelStyle}>Max Rooms</label>
            <select
              name="maxRooms"
              value={propertyData.maxRooms}
              onChange={handleInputChange}
              className={inputStyle}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyle}>Beds</label>
            <select
              name="beds"
              value={propertyData.beds}
              onChange={handleInputChange}
              className={inputStyle}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyle}>Baths</label>
            <select
              name="baths"
              value={propertyData.baths}
              onChange={handleInputChange}
              className={inputStyle}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Location & Price</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Area (sq ft)</label>
            <input
              type="number"
              name="area"
              value={propertyData.area}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter area"
            />
          </div>

          <div>
            <label className={labelStyle}>Price ($)</label>
            <input
              type="number"
              name="price"
              value={propertyData.price}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter price"
            />
          </div>
        </div>
      </div>

      <div className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Description</h2>
        <div>
          <label className={labelStyle}>Description</label>
          <textarea
            name="description"
            value={propertyData.description}
            onChange={handleInputChange}
            className={`${inputStyle} resize-none`}
            rows={4}
            placeholder="Enter property description"
          />
        </div>
      </div>

      <div className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelStyle}>Address</label>
            <input
              type="text"
              name="address"
              value={propertyData.address}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter address"
            />
          </div>

          <div>
            <label className={labelStyle}>City</label>
            <input
              type="text"
              name="city"
              value={propertyData.city}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className={labelStyle}>State</label>
            <input
              type="text"
              name="state"
              value={propertyData.state}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter state"
            />
          </div>
        </div>
      </div>

      <div className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Media Uploads</h2>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer block"
            >
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB each (20MB total)</p>
              </div>
            </label>
          </div>

          {/* Image Preview Grid */}
          {propertyData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {propertyData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={sectionStyle}>
        <h2 className={sectionTitleStyle}>Additional Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <label 
              key={feature.id} 
              className={`flex items-center p-3 rounded-lg transition-colors ${
                propertyData.selectedFeatures.includes(feature.id)
                  ? 'bg-blue-100'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <input
                type="checkbox"
                checked={propertyData.selectedFeatures.includes(feature.id)}
                onChange={() => handleFeatureToggle(feature.id)}
                className="mr-3 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className={`font-medium ${
                propertyData.selectedFeatures.includes(feature.id)
                  ? 'text-blue-800'
                  : 'text-gray-700'
              }`}>
                {feature.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button type="submit" className={buttonStyle}>
          Submit
        </button>
        <button
          type="button"
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg shadow-md hover:bg-gray-300 font-medium transition-colors"
          onClick={() => setPropertyData({
            propertyType: "",
            propertyStatus: "For Sale",
            maxRooms: 1,
            beds: 1,
            baths: 1,
            price: "",
            description: "",
            address: "",
            area: "",
            city: "",
            state: "",
            images: [],
            selectedFeatures: []
          })}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;