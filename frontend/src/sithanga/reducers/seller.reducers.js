import { sellerConstant } from "../actions/constants";

const initiateState ={
    sellers :[],
    loading: false,

}


export default(state = initiateState,action)=> {
    switch(action.type){
        case sellerConstant.GET_SELLER_REQUEST:
            state={
                ...state,
                loading:true
            }
            break
        case sellerConstant.GET_SELLER_SUCCESS:
            state={
                ...state,
                sellers: action.payload,
                loading:false,
            }
            break

        case sellerConstant.GET_SELLER_FAILURE:
            state={
                ...state,
                loading:false
            }
            break

       
    }
    return state
}