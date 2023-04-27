import { cartConstant } from "../actions/constants";

const init ={
    carts: [],
    loading: false,

}

export default(state = init,action)=> {
    switch(action.type){
        case cartConstant.GET_CART_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case cartConstant.GET_CART_SUCCESS:
            state={
                ...state,
                loading: false,
                carts: action.payload
            }
            break;
        case cartConstant.GET_CART_FAILURE:
            state={
                ...state,
                loading: false
            }
            break;
            case cartConstant.DELETE_CART_REQUEST:
                state={
                    ...state,
                    loading: true
                }
                break;
            case cartConstant.DELETE_CART_SUCCESS:
                state={
                    ...state,
                    loading: false,
                }
                break;
            case cartConstant.DELETE_CART_FAILED:
                state={
                    ...state,
                    loading: false
                }
                break;
    }
    return state
}