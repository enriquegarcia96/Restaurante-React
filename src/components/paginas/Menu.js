import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'

import Platillo from '../ui/Platillo'

const Menu = () => {


    //-- definir el state para los platillos ---//
    const [ platillos, guardarPlatillos  ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    //--- Consultar la base de datos al cargar ---//
    useEffect( () => {

        const obtenerPlatillos =  () =>{

            //--- para obtener los productos en tiempo real ---//
            firebase.db.collection('productos').onSnapshot( manejarSnapshot);
            //console.log(resultado);
        }
        obtenerPlatillos();
    },[])


    //--- Snapshot nos permite utilizar la base de datos en tiempo real de fireStore ---//
    function manejarSnapshot( snapshot ) {

        const platillos = snapshot.docs.map(doc => {//llena el arreglo de platillos
            return {
                id: doc.id,
                ...doc.data()//copio la informacion 
            }
        });
        //console.log(platillos)

        //--- almacenar los resultados en el state ---//
        guardarPlatillos(platillos)
    }




    return (
        <>
           <h1 className='text-3xl font-light mb-4'>Menu</h1> 
           <Link to='/nuevo-platillo' className='bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold'>
                Agregar Platillo
           </Link>

            {platillos.map( platillo => (
                <Platillo 
                    key={platillo.id}
                    platillo={platillo}
                />
            ) )}

        </>
    )
}

export default Menu
