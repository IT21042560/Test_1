import { sellerConstant } from './constants'
import axiosInstance from '../helpers/axiosSellers'
import { toast } from 'react-hot-toast'

export const getAllSellers = () => {
    return async (dispatch) => {
        dispatch({ type: sellerConstant.GET_SELLER_REQUEST })
        const res = await axiosInstance.get("/seller/seller")
        console.log(res)
        if (res.status === 200) {

            toast.success("Admin data fetched sucessfully..!", {
                id: 'fetched success'
            })
            dispatch({
                type: sellerConstant.GET_SELLER_SUCCESS,
                payload: res.data.payload
            })
        }
        else {
            dispatch({ type: sellerConstant.GET_SELLER_FAILURE })
        }
    }
}