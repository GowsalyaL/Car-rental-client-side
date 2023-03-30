import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import DefaultLayout from '../DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCar } from '../redux/actions/carAction'
import { Col, Divider, Row, DatePicker, Checkbox,} from 'antd'
import moment from 'moment'
import {bookCar} from '../redux/actions/BookingActions'


const BookingCar = () => {
const {RangePicker} = DatePicker
const {carid} = useParams();
const [cars, setCars] = useState({})
const [from, setFrom] = useState()
const[to, setTo] = useState()
const [totalHours, setTotalHours] = useState(0)
const [driver, setDriver] = useState(false)
const [totalAmount, setTotalAmount] = useState(0)
const { car } = useSelector(state => state.carReducer)
const dispatch = useDispatch() 


useEffect(() => {

 if(car.length === 0){
  dispatch(getAllCar())
 }
 else{
  setCars(car.find(item =>{
    return  item._id === carid
  }))
 }
}, [car])

useEffect(()=>{
  setTotalAmount((totalHours * cars.rentPerHour))
  if(driver){
    console.log(totalAmount)
    setTotalAmount( totalAmount + (30* totalHours))
  }
},[driver,totalHours])

const selectTimeSlot = (values) =>{
  console.log(moment(values[0]).format("MM DD YYYY HH:mm"));
  console.log(moment(values[1]).format("MM DD YYYY HH:mm"))
  setFrom(moment(values[0]).format("MM DD YYYY HH:mm"))
  setTo(moment(values[1]).format("MM DD YYYY HH:mm"))
  setTotalHours(values[1].diff(values[0], 'hours'))

}

const bookNow = () =>{
  const reqObj ={
    user : JSON.parse(localStorage.getItem('user'))._id,
    car : cars._id,
    totalHours,
     totalAmount, 
     driveRequired : driver,
      bookedTimeSlots :{
      from,
      to
    }
  }

  dispatch(bookCar(reqObj))
}

  return (
    <div>
<DefaultLayout>
<Row justify='center' className='d-flex align-items-center' style={{minHeight: '80vh'}}>
  <Col lg={10} sm={24} xs={24}>
    <img src={cars.image} className="carimg2 bs-1" alt=''/>
  </Col>
  <Col lg={10} sm={24} xs={24}>
    <Divider type='horizontal' >car info</Divider>
    <div style={{textAlign : 'right'}}>
      <p>{cars.name}</p>
      <p>{cars.rentPerHour}/hr</p>
      <p>Fuel : {cars.fuelType}</p>
      <p>Max Person : {cars.capacity}</p>      
    </div>

    <Divider type='horizontal' >Select Time Slots</Divider>
    <RangePicker showTime={{format:" HH:mm"}} format ='MM DD YYYY HH:mm' onChange={selectTimeSlot}/>


{from && to && (    <div>
    <p>TotalHours :<b>{totalHours}</b></p>
    <p>Rent per Hour : <b>{cars.rentPerHour}</b></p>
    <Checkbox onChange={(e)=>{
      if(e.target.checked){
      setDriver(true)
    }else{setDriver(false)}}}>Driver required</Checkbox>
    <h3>Total Amount : {totalAmount}</h3>

    <button className='btn1' onClick={bookNow}>Book Now</button>

    </div>)}
  </Col>
</Row>


</DefaultLayout>
    </div>
  )
}

export default BookingCar