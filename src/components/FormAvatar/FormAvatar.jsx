import React, { useState } from 'react'
import './FormAvatar.css'
import { handleAvatarUpload } from '../../services/authenticate/auth-user.service'

const FormAvatar = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [cameraIcon, setCameraIcon] = useState(true);
  const [fieldName, setFieldName] = useState(props.fieldName) 

  const [avatarImgRoute, setAvatarImgRoute] = useState('')

  const handleFileEvent = (e) => {
    const inputFile = e.currentTarget.querySelector('input[type="file"]');
    inputFile.click();
  }

  const handleUploadAvatar = async (e) => {
    const inputFile = e.currentTarget;
    const uploadData = new FormData();
    uploadData.append(fieldName, inputFile.files[0]);
    setIsLoading(true)
    const uploadAvatar = await handleAvatarUpload({formData: uploadData});
    setIsLoading(false)
    setAvatarImgRoute(uploadAvatar.media_url)
    props.handleAvatarFile(uploadAvatar.media_url)
    props.setAvatarUrl(uploadAvatar.media_url)
  }

  const handleSubmit = (e) => {
    e.preventDefaul();
  }

  return (
    <div className={`form-avatar-upload ${cameraIcon && 'cameraIcon'} ${isLoading && 'isLoading'}`} onClick={(e) => handleFileEvent(e)} style={{backgroundImage:`url("${avatarImgRoute}")`}}>
        <img src='/img/loader.svg' alt='spinner' />
        <input type="file" name="avatarUrl" onChange={(e) => handleUploadAvatar(e)}/>
    </div>
  )
}

export default FormAvatar
