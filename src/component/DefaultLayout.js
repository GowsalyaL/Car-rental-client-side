import React from 'react'
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const DefaultLayout = (props) => {

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      <div className="header box1" style={{ backgroundColor: 'lightgreen' }}>
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>{user.username}'s Rental Cars</h1>
              <Link to='/'> <button>Home</button></Link>
              <Link to='/booking/getallbookings'> <button>Bookings</button></Link>
              <Button onClick={() => { localStorage.removeItem('user'); window.location.href = '/login' }}>LogOut</Button>
            </div>


          </Col>
        </Row>
      </div>

      <div className="content">
        {props.children}

      </div>
    </div>
  )
}

export default DefaultLayout