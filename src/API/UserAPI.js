import axios from 'axios';

const axiosIns = axios.create({
    baseURL: "https://mern-user-crud-api-xk48.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
})

const UserApi = {
    readAll: () => {
        return axiosIns.request({
            method: "GET",
            url: "/api/user/all"
        })
    },
    readSingle: (id) => {
        return axiosIns.request({
            method: "GET",
            url: `/api/user/single/${id}`
        }) 
    },
    create: (user) => {
        return axiosIns.request({
            method: "POST",
            url: "/api/user/add",
            data: user

        })
    },
    update: (user,id) => {
        return axiosIns.request({
            method: "PATCH",
            url: `/api/user/update/${id}`,
            data: user
        })
    },
    delete: (id) => {
        return axiosIns.request({
            method: "DELETE",
            url: `/api/user/delete/${id}`
        }) 
    }
}

export default UserApi