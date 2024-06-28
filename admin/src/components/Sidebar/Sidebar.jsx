import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react';

const Sidebar = () => {
  return (
    <div class=" w-1/5 min-h-screen border-2 border-solid border-[#0891b2] border-t-0 text-xs">
      <div class="pt-12 pl-5 flex flex-col gap-5 " >
      <NavLink to='/addshop' className="flex items-center gap-3 border border-r-0 px-2 py-3 rounded rounded-r-none focus:bg-[#ecfeff] border-[#ecfeff]  ">
          <FeatherIcon icon="home" size='18' stroke='#0891b2'/>
          <p class="hidden md:block text-[#083344] ">Add New Coffee Shop</p>
        </NavLink>
        <NavLink to='/add' className="flex items-center gap-3 border border-r-0 px-2 py-3 rounded rounded-r-none focus:bg-[#ecfeff] border-[#ecfeff]  ">
        <FeatherIcon icon="clipboard" size='18' stroke='#0891b2'/>
          <p class="hidden md:block text-[#083344] ">Add Products to Menu</p>
        </NavLink>
        <NavLink to='/list' className="flex items-center gap-3 border border-r-0 px-2 py-3 rounded rounded-r-none focus:bg-[#ecfeff] border-[#ecfeff]  ">
        <FeatherIcon icon="archive" size='18' stroke='#0891b2'/>
          <p class="hidden md:block text-[#083344] ">Show All Products</p>
        </NavLink>
        <NavLink to='/orders' className="flex items-center gap-3 border border-r-0 px-2 py-3 rounded rounded-r-none focus:bg-[#ecfeff] border-[#ecfeff]  ">
        <FeatherIcon icon="inbox" size='18' stroke='#0891b2'/>
          <p class="hidden md:block text-[#083344] ">All Orders</p>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Sidebar