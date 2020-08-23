import React, { useState } from 'react'
import './FormAvatar.css'
import { handleAvatarUpload } from '../../services/auth-service';

const FormAvatar = (props) => {

  const [avatarLoading, setAvatarLoading] = useState(true);
  const [avatarWrapper, setAvatarWrapper] = useState('')

  const handleFileEvent = (e) => {
    const inputFile = e.currentTarget.querySelector('input[type="file"]');
    inputFile.click();
  }

  const handleUploadAvatar = async (e) => {
    const inputFile = e.currentTarget;
    const uploadData = new FormData();
    uploadData.append("avatarUrl", inputFile.files[0]);
    const uploadAvatar = await handleAvatarUpload({formData: uploadData, isCoach: false});
    setAvatarLoading(false);
    setAvatarWrapper(uploadAvatar.avatar_url)
  }

  const handleSubmit = (e) => {
    e.preventDefaul();
  }

  return (
    <div className={`form-avatar-upload ${avatarLoading && 'isLoading'}`} onClick={(e) => handleFileEvent(e)} style={{backgroundImage:`url("${avatarWrapper}")`}}>
        <input type="file" name="uploadAvatar" onChange={(e) => handleUploadAvatar(e)} value={props.values.avatarUrl}/>
    </div>
  )
}

export default FormAvatar
