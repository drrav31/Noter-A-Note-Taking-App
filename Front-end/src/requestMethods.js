import axios from "axios";
// import React from "react";


const BASE_URL = "https://noter2.herokuapp.com/api/";
const userPresent = localStorage.getItem("persist:root")
const TOKEN = userPresent?JSON.parse(JSON.parse(userPresent).user)?.currentUser?.accessToken:null;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token: `Bearer ${TOKEN}`},

    }
)