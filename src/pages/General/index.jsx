import React, { useEffect, useState } from 'react'

export default (props) => {
  const system_iframe_style = {
    width: '100%',
    height: '100%',
    border: 'none',
  }
  const { hostname } = window.location;
  // {`http://172.20.3.93:3000/d/Bm4sOIfSz/sql_metrics?orgId=1&kiosk`}

  return (
    <div className="basePage framePage" style={{ padding: 0 }}>
      <iframe src={`http://${hostname}:3000/d/Bm4sOIfSz/sql_metrics?orgId=1&kiosk`} className='system_iframe' style={system_iframe_style} />
    </div>
  )
}