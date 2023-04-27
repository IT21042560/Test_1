import { orderConstant } from "./constants";
import axiosInstance from "../helpers/axiosOrder"
import toast from 'react-hot-toast'
import {GetCart} from './cartAction'


export const acceptOrder = (data) => {

    return async (dispatch) => {
        try{
            dispatch({type:orderConstant.ACCEPT_ORDER_REQUEST})
            const res = await axiosInstance.post('/orderedItemRoute/add',data)
            if(res.status === 201){
                toast.success("Order Accepted..!",{
                    id: 'acpOrd'
                })
                dispatch({
                    type:orderConstant.ACCEPT_ORDER_SUCCESS,
                    payload:res.data.payload
                })
                dispatch(GetCart())
            }else{
                toast.error("Order accept error..!",{
                    id: 'acperr'
                })
                dispatch({type:orderConstant.ACCEPT_ORDER_FAILURE})
            }
        }catch(error){
          console.log("server crashed..!")
          toast.error("server crashed..!",{
            id: 'crshed'
          })
        }
    }
}

export const getOrders = () => {
    return async (dispatch) => {
        dispatch({type: orderConstant.GET_ORDERS_REQUEST})
        const res = await axiosInstance.get('/orderedItemRoute/get')
        if(res.status === 200){
            toast.success("Data Fetched..!" ,{
                id: 'fetch seccess'
            })
            dispatch({
                type:orderConstant.ACCEPT_ORDER_SUCCESS,
                payload:res.data
            })
        }else{
            toast.error("Fetched error..!",{
                id: 'ferr'
            })
            dispatch({type:orderConstant.GET_ORDERS_FAILURE})
        }
    }
}
