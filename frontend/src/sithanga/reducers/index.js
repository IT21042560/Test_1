import authReducers from "./auth.reducers";
import cartReducers from "./cartReducers";
import orderReducers from './order.Reducer';
import sellerReducers from "./seller.reducers";
import commissionConstant from './com.reducers'
import {combineReducers} from'redux'

const rootReducer = combineReducers({
    auth:authReducers,
    cart:cartReducers,
    order:orderReducers,
    seller:sellerReducers,
    commission :commissionConstant,

})

export default rootReducer;