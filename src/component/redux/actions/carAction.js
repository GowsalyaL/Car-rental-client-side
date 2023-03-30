import axios from 'axios'


export const getAllCar = ()=>async dispatch =>{

    dispatch({type: "LOADING", payload : true})

    try{
        const res = await axios.get('/api/car/getallcar')
        dispatch ({type: 'GET_ALL_CAR', payload: res.data})

    } catch(error){
        dispatch({type: "LOADING", payload : false})
    }
}