import React from 'react'

function SectionBg(props) {
  return (
    <section style={{backgroundImage: "url('${props.bgImage}')"}}>
      {props.children}
    </section>
  )
}

export default SectionBg;