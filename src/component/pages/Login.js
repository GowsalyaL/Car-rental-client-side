import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'

import { userLogin } from '../redux/actions/userActions'

const Login = () => {

  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(userLogin(values))
  }


  return (
    <div>

      <div className="login">
        <Row style={{ position: 'relative' }}>
          <Col lg={10} className='text-left p-5'>
            <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
              <h1>Login</h1>
              <hr />

              <Form.Item name='username' label='username' rules={[{ required: true }]}>
                <Input />
              </Form.Item >

              <Form.Item name='password' label='password' rules={[{ required: true }]}>
                <Input />
              </Form.Item>


              <button className='btn1 mt-2 mb-4'>Login</button>

              <br />

              <Link to='/register'>New User? Click here to Register</Link>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Login