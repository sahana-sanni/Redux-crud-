import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { fetchUsers, createNewUser, updateUser, deleteUser } from "../Actions/UserAction";


//initial state
let initState = []

const userSlice = createSlice({
    name: "user",
    initialState: initState,
    extraReducers: (builder) => {
        builder
           .addCase(fetchUsers.fulfilled, (state, action) => {
               return[...action.payload]

           })
           .addCase(createNewUser.fulfilled, (state, action) => {
                 state.push(action.payload.newUser)
            
           })
           .addCase(updateUser.fulfilled, (state, action) => {
                 let index = state.findIndex(item => item._id === action.payload.id)
                   state[index] = {
                    ...state[index],
                    ...action.payload
                   }
            
           })
           .addCase(deleteUser.fulfilled, (state, action) => {
               let index = state.findIndex(item => item._id === action.payload.id)
                 state.splice(index,1)
            
           })
    }
})

let UserReducer = combineReducers({
    users: userSlice.reducer
})

export default UserReducer