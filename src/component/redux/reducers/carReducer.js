const initialState = {
    car :[]

}

export const carReducer = (state = initialState, action) =>{
    
    switch(action.type)
    {
        case "GET_ALL_CAR" : {
            return {
                ...state,
                car : action.payload
            }
        }            
        default : return state
    }


}