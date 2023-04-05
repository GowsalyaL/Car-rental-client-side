import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import DefaultLayout from '../DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCar } from '../redux/actions/carAction'
import { Col, Row, DatePicker} from 'antd'
import moment from 'moment'


const Home = () => {

  const { RangePicker } = DatePicker
  const { car } = useSelector(state => state.carReducer)
  const dispatch = useDispatch()
  const [totalcars, setTotalcars] = useState([])
  useEffect(() => {
    dispatch(getAllCar())
    setTotalcars(car)
  }, [])

  useEffect(() => { setTotalcars(car) }, [car])

  const setFilter = (values) => {
    var selectedFrom = moment(values[0],'MM DD yyyy HH:mm')
    var selectedTo = moment(values[1] , 'MM DD yyyy HH:mm')
    var temp = [];
    for (var cars of car) {
        if (cars.bookedTimeSlots.length ===0) {
        temp.push(cars)
      }     
      else {       
        if (selectedFrom.isBetween(cars.from, cars.to) || selectedTo.isBetween(cars.from, cars.to) || moment(cars.from, cars.to).isBetween(selectedFrom, selectedTo) || moment(cars.to).isBetween(selectedFrom, selectedTo)) {
            temp.push(cars)
          }
      }
    }
      setTotalcars(temp)
  }

    return (
      <>
        <DefaultLayout>

          <Row className='mt-3' justify='center'>
            <Col lg={20} sm={24} >
              <h4>Select Hourly Car Rental</h4>
              <hr></hr>
              <RangePicker showTime ={{format : "HH:mm"}} format='MM DD YYYY HH:mm' onChange={setFilter} />
            </Col>
          </Row>
          <Row justify='center' gutter={16}>
            {totalcars.map((items) => {
              return <Col lg={6} sm={24} xs={24}>
                <div className='car p-2 bs-1 mt-3'>
                  <img src={items.image} className="carimg" alt='' />
                  <div className='car-content'>
                    <div >
                      <p>{items.name}</p>
                      <p>INR:{items.rentPerHour}/hr</p>
                    </div>
                    <div>
                      <button className='btn1 '><Link to={`/booking/${items._id}`}>Book Now</Link></button>
                    </div>
                  </div>
                </div>
              </Col>
            })}
          </Row>

        </DefaultLayout>

      </>

    )
  }

  export default Home