import { commissionConstant } from "../actions/constants";

const initiateState ={
    commissions :[],
    loading: false,

}


export default(state = initiateState,action)=> {
    switch(action.type){
        case commissionConstant.GET_COMMISSION_REQUEST:
            state={
                ...state,
                loading:true
            }
            break
        case commissionConstant.GET_COMMISSION_SUCCESS:
            state={
                ...state,
                commissions: action.payload,
                loading:false,
            }
            break

        case commissionConstant.GET_COMMISSION_FAILURE:
            state={
                ...state,
                loading:false
            }
            break

       
    }
    return state
}