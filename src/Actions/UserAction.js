import { createAsyncThunk } from "@reduxjs/toolkit";
import UserApi from "../API/UserAPI";



//to read all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    let res = await UserApi.readAll()
    return res.data.users
});

//to create a new user
export const createNewUser = createAsyncThunk("users/createNewUser", async (user) => {
    console.log(`new user =`, user);
    let res = await UserApi.create(user)
    return res.data
})


//to update a user
export const updateUser = createAsyncThunk("users/updateUser", async ({user,id}) => {
       let res = await UserApi.update(user,id)
       return res.data
})


//to delete a user
export const deleteUser = createAsyncThunk("users/deleteUser", async ({id}) => {
    let res = await UserApi.delete(id)
    return { id, ...res.data }
})
