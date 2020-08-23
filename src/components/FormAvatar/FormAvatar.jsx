import React from 'react'
import './FormAvatar.css'

const FormAvatar = () => {

  const handleFileEvent = (e) => {
    const inputFile = e.currentTarget.querySelector('input[type="file"]');
    inputFile.click();
  }

  const handleUploadAvatar = (e) => {
    const inputFile = e.currentTarget;
    const uploadData = new FormData();
    uploadData.append("imageUrl", inputFile.files[0]);
    console.log(inputFile.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefaul();
  }

  return (
    <div className="form-avatar-upload" onClick={(e) => handleFileEvent(e)}>
        <input type="file" name="uploadAvatar" onChange={(e) => handleUploadAvatar(e)} />
    </div>
  )
}

export default FormAvatar
