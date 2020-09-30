import React from 'react'
import './UserIntro.css'

function UserIntro({client, nextTraining}) {
  return (
    <section className="userIntro">
      <div className="userIntro_avatar">
        <div className="userIntro_avatar_image" style={{backgroundImage:`url("${client.avatarUrl}")`}}></div>
      </div>
      <div className="userIntro_content">
        <div className="userIntro_content_title mb-0">Hola {client && client.name}</div>
        { !client.isCoach && nextTraining 
          ? (<p>¡Te quedan 12 días de entrenamiento!</p>) 
          : (<p>¡Bienvenido a inFit!</p>)}
      </div>
    </section>
  )
}

export default UserIntro
