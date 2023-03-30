import axios from 'axios'
import {message} from 'antd'

export const bookCar = (reqObj)=>async (dispatch) =>{

    dispatch({type: "LOADING", payload : true})
    try{
        await axios.post('/api/booking/bookingCar', reqObj)
        dispatch ({type: 'LOADING', payload: true})
        message.success('Your Car Booked Sucessfully')
       

    } catch(error){
        console.log(error)
        dispatch({type: "LOADING", payload : false})
        message.error('Something went wrong; Please try later')
    }
}

export const getAllBookings = ()=>async dispatch =>{

    dispatch({type: "LOADING", payload : true})

    try{
        const res = await axios.get('/api/booking/Getbooking')
        dispatch ({type: 'GET_ALL_BOOKINGS', payload: res.data})
        console.log(res.data)

    } catch(error){
        console.log(error)
        dispatch({type: "LOADING", payload : false})
    }
}