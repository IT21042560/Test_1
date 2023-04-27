import { commissionConstant } from './constants'
import axiosInstance from '../helpers/axiosCommis'
import { toast } from 'react-hot-toast'

export const getAll = () => {
    return async (dispatch) => {
        dispatch({ type: commissionConstant.GET_COMMISSION_REQUEST })
        const res = await axiosInstance.get("/Commission/get")

        if (res.status === 201) {

            toast.success("Commision data fetched sucessfully..!", {
                id: 'fetched success'
            })
            dispatch({
                type: commissionConstant.GET_COMMISSION_SUCCESS,
                payload: res.data.payload
            })
        }
        else {
            dispatch({ type: commissionConstant.GET_COMMISSION_FAILURE })
        }
    }
}