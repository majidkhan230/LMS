import { apiClient } from "@/api"
import toast from "react-hot-toast"


export const getReq = async (req)=>{
    try {
        const response = await apiClient.get(req)
        return response
    } catch (error) {
        toast.error(error)
    }

}

export const postReq = async (req, data)=>{
    try {
        const response = await apiClient.post(req, data)
        toast.success(response.data.message)
        return response
    } catch (error) {
        toast.error(error?.response?.data?.message)
        console.log(error)
    }

}

export const putReq = async (req, data)=>{
    const response = await apiClient.put(req, data)
    return response
}

export const deleteReq = async (req)=>{
    const response = await apiClient.delete(req)
    return response
}
