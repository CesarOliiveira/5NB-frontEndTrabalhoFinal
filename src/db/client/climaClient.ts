import { ClimaContext } from "@/app/_layout";
import axios from "axios";
import { useContext } from "react";

const DB_URL = "http://192.168.15.3:4000"



export const getClimaByLatitudeAndLongitude = async (latitude : Number, longitude : Number) => {
   const response = await axios.get("http://192.168.15.3:4000/api/clima/-23.65174/-46.8477917")
   .then((response) => {
        return response.data;
   })
   .catch((err) => {
        return err;
   })

   return response;
}

export const getClimaByLocation = async (latitude, longitude) => {
    const { setClima } = useContext(ClimaContext);
    const response = await getClimaByLatitudeAndLongitude(latitude, longitude);
    
   setClima({teste: response})
}