import React, { useState } from 'react'
import './FormAvatar.css'
import { handleAvatarUpload } from '../../services/authenticate/auth-user.service'

const FormAvatar = (props) => {

  const [isLoading, setIsLoading] = useState(true);
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
    const uploadAvatar = await handleAvatarUpload({formData: uploadData, isCoach: false});
    console.log('imagen subida!')
    setIsLoading(false)
    setAvatarImgRoute(uploadAvatar.avatar_url)
    props.handleAvatarFile(uploadAvatar.avatar_url)
    props.setAvatarUrl(uploadAvatar.avatar_url)
  }

  const handleSubmit = (e) => {
    e.preventDefaul();
  }

  return (
    <div className={`form-avatar-upload ${isLoading ? 'isLoading' : ''}`} onClick={(e) => handleFileEvent(e)} style={{backgroundImage:`url("${avatarImgRoute}")`}}>
        <input type="file" name="avatarUrl" onChange={(e) => handleUploadAvatar(e)}/>
    </div>
  )
}

export default FormAvatar
