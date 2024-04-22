import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../Actions/UserAction'


function Update() {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        dob: "",
        age: 0,
        address: ""
    })

    const navigate = useNavigate()
    const params = useParams()

    const dispatch = useDispatch()

    const readUser = async () => {
        await axios.get(`/api/user/single/${params.id}`)
           .then(res => {
              setUser(res.data.user)
           }).catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
       readUser()
    },[])

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
         console.log(`user =`, user)
         await dispatch(updateUser({ user, id: params.id }))
         .unwrap()
         .then(res => {
            toast.success(res.msg)
            navigate(`/`)

        }).catch(err => toast.error(err.response.data.msg))
       
      }catch (err){
        toast.error(err.message)
      }
    }
  return (
      <div className="container">
          <div className="row">
              <div className="col-md-12 text-center">
                <h3>Update User</h3>
                <p className='text-secondary'> { params.id }</p>
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
                            <input type="submit" value="Update" className='btn btn-dark' />
                           </div>
                        </form>

                       </div>
                   </div>
              </div>
          </div>
      </div>
  )
}

export default Update