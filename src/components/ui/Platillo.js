import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase'

const Platillo = ({ platillo }) => {

    //--- Existencia REF para acceder al valor directamente ---//
    const existenciaRef = useRef(platillo.existencia);


    //--- context de firebase para cambios en la BD ---//
    const { firebase } = useContext(FirebaseContext)


    //console.log(platillo)
    const {id, nombre, imagen, existencia, categoria, precio, descripcion } = platillo

    //--- Modificar el estado del platillo en Firebase ---//
    const actualizarDisponibilidad = () => {

        //*--- para poder cambiar un string de true o false a un Boolean ---//
        const existencia = (existenciaRef.current.value === 'true');

        //console.log(existencia);
        //console.log(typeof existenciaRef.current.value)

        //--- actualizando el producto en firebase ---//
        try {
            firebase.db.collection('productos').doc(id).update({existencia})

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='w-full px-3 mb-4'>
            <div className='p-5 shadow-md bg-white'>
                <div className='lg:flex'>
                    <div className='lg:w-5/12 xl:w-3/12'>
                        <img src={imagen} alt='imagen platillo' />

                        <div className='sm:flex sm:-mx-2 pl-2'>

                            <label className='block mt-5 sm:w-2/4' >
                                <span className='block text-gray-800 mb-2'>Existencia</span>

                                <select 
                                    className='bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none  focus:shadow-outline'
                                    value={existencia}
                                    ref={existenciaRef}//le va a dar el valor una vez que lo seleccione
                                    onChange={ () => actualizarDisponibilidad() }
                                    >
                                    <option value='true'>Disponible</option>
                                    <option value='false'>No Disponible</option>
                                </select>
                            </label>

                        </div>

                    </div>
                    <div className='lg:w-7/12 xl:w-9/12 pl-5'>

                        <p className='font-bold text-2xl text-yellow-600 mb-4'>{nombre}</p>

                        <p className='text-gray-600 mb-4'>Categoria: {''}
                            <span className='text-gray-700 font-bold'>{categoria.toUpperCase()}</span>
                        </p>

                        <p className='text-gray-600 mb-4'>{descripcion}</p>

                        <p className='text-gray-600 mb-4'>Precio: {''}
                            <span className='text-gray-700 font-bold'>L {precio}</span>
                        </p>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Platillo
