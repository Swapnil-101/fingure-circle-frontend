// src/socket.ts
import { io } from "socket.io-client";
import baseURL from "./config";

// const socket = io("http://127.0.0.1:5000/");
const socket = io("https://figurecircle-mainbackend.onrender.com/");



export default socket;
