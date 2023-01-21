import {useEffect, useState,useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext'

export const PetContext = () => {

const {userInfo} = useContext(AuthContext);
const [isLoading, setisLoading] = useState(true);
const [pet, setPet] = useState({});
const [clinic, setClinic] = useState([]);


const getMascota=()=>{
    const url = 'https://agapet.pythonanywhere.com/user/data';
    axios.get(url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userInfo.access
            },   
    }).then(res => {
        // *********************
        axios.get(`https://agapet.pythonanywhere.com/mascota/usuario/${res.data.iduser}/`,
        {
            headers: {
                'Content-Type': 'application/json',
            },   
        }).then(res => {
            setisLoading(false);
            let data = res.data
            setPet(data)
        }).catch(e => {
            console.log(`data error ${e}`);
            });
        // *********************
    }).catch(e => {
        console.log(`data error ${e}`);
    });
}

const getVacunas=()=>{
    const url = 'https://agapet.pythonanywhere.com/user/data';
    axios.get(url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userInfo.access
            },   
    }).then(res => {
        // *********************
        axios.get(`https://agapet.pythonanywhere.com/vacuna/mascota?iduser=${res.data.iduser}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },   
        }).then(res => {
            setisLoading(false);
            let data = res.data
            setClinic(data)
        }).catch(e => {
            console.log(`data error ${e}`);
            });
        // *********************
    }).catch(e => {
        console.log(`data error ${e}`);
    });
};

    useEffect(() => {
        getMascota();
        getVacunas();
    },[])


   
  return {
    pet,
    clinic,
    isLoading
  };
};
