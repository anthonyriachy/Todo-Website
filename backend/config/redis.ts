import { createClient } from 'redis';
import dotenv from "dotenv"
dotenv.config();
export const client = createClient({
    password: process.env.PASSWORD,
    socket: {
        host:process.env.HOST,
        port:process.env.REDIS_PORT?parseInt(process.env.REDIS_PORT):11537
    } 
});

client.on('error',err=>console.error('error in redis : '+err));

if(!client.isOpen){ // so we dont connect multiple time
    console.log("redis connected")
    client.connect();
}