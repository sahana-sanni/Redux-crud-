import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../Actions/UserAction'



function Create() {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        dob: "",
        age: 0,
        address: ""
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const readInput = (e) => {
        const { name, value } = e.target
        if(name === "dob"){
            let yr = new Date(value).getFullYear()
            let cYr = new Date().getFullYear()
            let ag = cYr - yr
            setUser({
              ...user,
              age: ag,
              dob: value
            })
        }else{
          setUser({
             ...user,
             [name]: value
          })
        }
    }

    const submitHandler = async (e) => {
      e.preventDefault()
      try{
         console.log(`user = `, user)
         await dispatch(createNewUser(user))
            .unwrap()
            .then(res => {
                toast.success(res.msg)
              }).catch(err=> toast.error(err.response.data.msg));
      }catch (err){
        toast.error(err.message)
      }
    }
  return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 text-center">
                <h3>Add New User</h3>
              </div>
          </div>

          <div className="row">
              <div className="col-md-6 offset-md-3">
                   <div className="card">
                       <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                           <div className="form-group mt-2">
                               <label htmlFor="name">Name</label>
                               <input type="text" name='name' value={user.name} onChange={readInput} className='form-control' id='name' placeholder='Enter Name' required />
                           </div>
                           <div className="form-group mt-2">
                               <label htmlFor="email">Email</label>
                               <input type="email" name='email' value={user.email} onChange={readInput} className='form-control' id='email' placeholder='Enter Email' required />
                           </div>
                           <div className="form-group mt-2">
                               <label htmlFor="mobile">Mobile</label>
                               <input type="mobile" name='mobile' value={user.mobile} onChange={readInput} className='form-control' id='mobile' placeholder='Enter Mobile' required />
                           </div>
                           <div className="form-group mt-2">
                               <label htmlFor="dob">Date of Birth</label>
                               <input type="date" name='dob' value={user.dob} onChange={readInput}  id='dob' className='form-control' required />
                           </div>
                           <div className="form-group mt-2">
                               <label htmlFor="age">Age</label>
                               <input type="age" name='age' value={user.age} onChange={readInput}  id='age' className='form-control' required />
                           </div>
                           <div className="form-group mt-2">
                               <label htmlFor="address">Address</label>
                               <textarea type="address" name='address' value={user.address} onChange={readInput}  id='address' cols="30" rows="5" className='form-control' required></textarea>
                           </div>
                           <div className="form-group mt-2">
                            <input type="submit" value="Add New" className='btn btn-dark' />
                           </div>
                        </form>

                       </div>
                   </div>
              </div>
          </div>
      </div>
  )
}

export default Create