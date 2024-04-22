import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, deleteUser } from '../Actions/UserAction'

function Home() {
    const dispatch = useDispatch()

    const readInit = useCallback(() =>{
         dispatch(fetchUsers())

    },[])

    const users =  useSelector(item => item.users)

    useEffect(()=>{
      readInit()
    },[readInit])

    //delete user
    const deleteHandler = async (id) => {
      if(window.confirm(`Are you sure you want to delete?`)){
               await dispatch(deleteUser({id}))
               .unwrap()
               .then(res => {
                        toast.success(res.msg)
               }).catch(err => toast.error(err.response.data.msg))
          
      }
    }


  return (
   <div className="container">
       <div className="row">
            <div className="col-md-12 text-center">
              <h1>Users</h1>
            </div>
       </div>

         <div className="row">
            <div className="col-md-12">
              <div className="table table-responsive">
                <table className='table table-bordered table-striped table-hover'>
                    <thead>
                        <tr>
                          <th colSpan={8}>
                              <NavLink to={`/create`} className="btn btn-dark float-end">Add New</NavLink>
                          </th>
                        </tr>
                        <tr className='text-center'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>DOB</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                          users && users.map((item,index) => {
                              return (
                                 <tr className='text-center' key={index}>
                                  <td> {item.name} </td>
                                  <td> {item.email} </td>
                                  <td> {item.mobile} </td>
                                  <td> {item.dob} </td>
                                  <td> {item.age} </td>
                                  <td> {item.address} </td>
                                  <td> {item.isActive ? <span className='text-success'>Active</span> : <span className='text-danger'>Disabled</span>} </td>
                                  <td>
                                      <NavLink to={`/edit/${item._id}`} className="btn btn-sm btn-info">
                                        <i className='bi bi-pencil'></i>
                                      </NavLink>
                                      <button onClick={() => deleteHandler(item._id)} className='ms-3 btn btn-sm btn-danger'>
                                        <i className='bi bi-trash'></i>
                                      </button>
                                  </td>
                                 
                                 </tr>
                              )
                          })
                      }
                    </tbody>

                </table>
              </div>
            </div>
         </div>
   </div>
  )
}

export default Home