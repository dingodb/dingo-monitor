import React, { useEffect, useState } from 'react'
import './index.less'
import { Modal } from 'antd'
import { CloseOutlined, CaretDownOutlined } from '@ant-design/icons'

const RenderCard = ({ data }) => {
  const [show, setShow] = useState(true)
  return <div className="rect_card">
    <div className="card_title">{data?.type}</div>
    <div className="card_content">
      <div className="content_item">duration: {data?.duration}</div>
      <div className="content_item">count: {data?.count}</div>
    </div>
    {
      data.children?.filter(Boolean).length ? <div className="card_extra">
        <div className="extra_line_box" onClick={() => setShow(!show)}>
          <CaretDownOutlined />
        </div>
        {show && <div className="extra_content">
          {
            data.children?.filter(Boolean).map((item, index) => <div className='card_extra_item'>
              <div className="top_line"></div>
              <RenderCard key={index} data={item} />
            </div>
            )
          }
        </div>}

      </div> : ''
    }
  </div>
}

const DetailCard = ({ data, onClose }) => {
  return <div className="rect_modal">
    <div className="title">
      执行计划可视化
      <CloseOutlined onClick={onClose} />
    </div>
    <div className="content">
      <RenderCard data={JSON.parse(data) || {}} />
    </div>
  </div>
}

export default ({ data = [] }) => {
  const [showDetailModal, setShowDetailModal] = useState(false)

  return (
    <div className='rect'>
      <div className="scale" onClick={() => setShowDetailModal(true)}>
        <RenderCard data={JSON.parse(data) || {}} />
      </div>


      <Modal
        destroyOnClose={true}
        maskClosable={false}
        title=""
        width='90%'
        open={showDetailModal}
        footer={null}
        modalRender={() => <DetailCard data={data} onClose={() => setShowDetailModal(false)} />}
        style={{ pointerEvents: 'auto', height: '80%', top: '10%', paddingBottom: '0' }}
      />
    </div>
  )
}