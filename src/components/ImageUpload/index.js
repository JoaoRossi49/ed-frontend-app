/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Input } from '@mui/material';

const ImageUpload = ({ value, onChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  React.useEffect(() => {
    if (value && typeof value === 'string') {
      setPreview(value);
    } else if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(value);
    }
  }, [value]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <Input
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button variant="contained" color="success" component="span">
          FOTO DE PERFIL
        </Button>
      </label>
      {preview && (
        <div style={{ position: 'absolute', top: '50px', left: '8px', zIndex: 1 }}>
          <img src={preview} alt="Selected" style={{ maxHeight: 80, maxWidth: 120 }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
