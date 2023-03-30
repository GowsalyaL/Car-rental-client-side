import React, { useEffect } from 'react'
import DefaultLayout from '../DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/BookingActions'
import { Col, Row } from 'antd'


const Bookings = () => {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingReducer)

    useEffect(() => {
        dispatch(getAllBookings())
    }, [])




    return (
        <DefaultLayout>
            <h3 className='mt-2'>My Bookings</h3>

            <Row  gutter={16}>

                <Col >
                    {bookings.map(booking => {
                        return <Row className='bs-1 m-2'>
                            <Col lg={7} sm={24}>
                                <p><b>{booking.car.name}</b></p>
                                <p>Total hours<b>{booking.totalHours}</b></p>
                                <p> Rent Per Hour<b>{booking.car.rentPerHour}</b></p>
                                <p>Total Amount<b>{booking.totalAmount}</b></p>

                            </Col>
                            <Col lg={10} sm={24}>

                                <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                                <p>To: <b>{booking.bookedTimeSlots.to}</b></p>



                            </Col>
                            <Col lg={7} sm={24}>
                                <img src={booking.car.image} height="140" className='p-2' img=''/>


                            </Col>

                        </Row>
                    })}

                </Col>



            </Row>


        </DefaultLayout>
    )
}

export default Bookings