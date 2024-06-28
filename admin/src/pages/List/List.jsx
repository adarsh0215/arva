import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"

const List = ({url}) => {
  
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    
    if (response.data.success) {
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

    
  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className=' px-10 py-10'>
      <p>All Food List</p>
      <div className=''>
        <div className='grid grid-cols-[0.5fr_3fr_1fr_1fr_0.5fr]  items-center gap-5 border  text-lg px-2 py-2 border-solid border-[#cacaca] bg-[#f9f9f9]'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='grid grid-cols-[0.5fr_3fr_1fr_1fr_0.5fr] items-center gap-5 border  text-lg px-2  py-2 border-solid border-[#cacaca]'>
              <img src={`${url}/images/`+item.image} alt="" className=' w-14'/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor-pointer' onClick={()=>removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default List