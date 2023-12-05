import './Appointment.css'

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/Firebase';
import { useParams } from 'react-router-dom';

function Appointment(){

    const consultasRef = collection(db, "consultas");
    const [consultas, setConsultas] = useState([]);
    const [data, setData] = useState("");

    let {userId} = useParams();

    useEffect(() => {

        const getConsultas = async () => {
            const queryConsultas = query(consultasRef, where("userID", "==", userId))
            const consultasData = await getDocs(queryConsultas)
            setConsultas(consultasData.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getConsultas();
    }, []);

    return(
        <>
            <div className="main-appointment-container">
                    <h3>Consultas agendadas</h3>

                    <div className="query-management">
                    {consultas.map((consulta) => {
                                return (
                                    <>
                                    <div className="query-info">
                                        <strong>Dr. {consulta.nameMedic}</strong>
                                    </div>
                                    <div className="other-info">
                                        <span>Convênio: <strong>{consulta.convenio}</strong></span>
                                        <span>Data: <strong>{consulta.date_hour}</strong></span>
                                    </div>
                                    <div className="query-btns">
                                        <button>Cancelar consulta</button>
                                    </div>
                                    
                                    </>
                                )
                            })}
                    </div>
                </div>
        </>
    );
};

export default Appointment;