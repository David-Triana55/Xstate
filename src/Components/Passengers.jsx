import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
    const [value, changeValue] = useState('');
    
    const onChangeInput = (e) => {
        changeValue(e.target.value);
    }
    
    const goToTicket = () => {
        if(value !== '') {
            send({ type: 'ADD', newPassenger: value });
        }
        send({ type: "DONE" });

    }
    
    const submit = (e) => {
        e.preventDefault();
        send({ type: 'ADD', newPassenger: value });
        changeValue('');
    }

    


    return (
        <form onSubmit={submit} className='Passengers'>
            <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>

                {state.context.passengers.map((passenger, index) => (
                    <p style={{textAlign: 'start', margin: 0}} key={index} >{passenger}</p>
                ))}


            <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder='Escribe el nombre completo' 
                required 
                value={value} 
                onChange={onChangeInput}
            />
            <div className='Passengers-buttons'>
                <button 
                    className='Passengers-add button-secondary'
                    type="submit"
                >          
                    Agregar Pasajero
                </button>
                <button
                    className='Passenger-pay button'
                    type="button"
                    onClick={goToTicket}

                    >
                    Ver mi ticket
                </button>
            </div>
        </form>
    );
};