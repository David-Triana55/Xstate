import React from 'react';
import './Tickets.css';

export const Tickets = ({ send, context }) => {
    const finish = () => {
        send({ type: "FINISH" });

    };
    
    console.log(context);
    return (
        <div className='Tickets'>
            <p className='Tickets-description description'>
                Gracias por volar con book a fly 💚
            </p>

            <div className='Tickets-ticket'>
                <div className='Tickets-country'>
                    {context.selectedCountry}
                </div>
                <div className='Tickets-passengers'>
                    {context.passengers.map((passenger, index) =>(
                        <li style={{listStyle: 'none'}} key={index}>{passenger}</li>
                    ))}
                    <span>✈</span>
                </div>
            </div>

            <button onClick={finish} className='Tickets-finalizar button'>
                Finalizar
            </button>
        </div>
    );
};