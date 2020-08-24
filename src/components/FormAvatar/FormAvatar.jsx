import React, { useState } from 'react'
import './FormAvatar.css'
import { handleAvatarUpload } from '../../services/auth-service'
import WithAuth from '../../services/AuthProvider';

const FormAvatar = (props) => {

  const { isLoading, setIsLoading } = WithAuth();

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
    setIsLoading(false)
    setAvatarWrapper(uploadAvatar.avatar_url)

    if(props.formikName.errors.avatarUrl){
      delete props.formikName.errors.avatarUrl;
      props.setButtonDisabled(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefaul();
  }

  return (
    <div className={`form-avatar-upload ${isLoading ? 'isLoading' : ''}`} onClick={(e) => handleFileEvent(e)} style={{backgroundImage:`url("${avatarWrapper}")`}}>
        <input type="file" name="avatarUrl" onChange={(e) => handleUploadAvatar(e)} value={props.formikName.values.avatarUrl}/>
    </div>
  )
}

export default FormAvatar
