import React, { useEffect, useState } from 'react'
import './index.less'

export default ({ string }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (string) {
      const arr = string.split('\r\n').filter(Boolean)
      setData(arr)
    }
  }, [string])

  return (
    <div className='treeTable'>
      {
        data.map((item, index) => (
          <div key={index} className='treeTableItem' style={{ paddingLeft: index * 10 + 'px' }}>
            {index !== 0 && '└─'}{item}
          </div>
        ))
      }
    </div>
  )
}