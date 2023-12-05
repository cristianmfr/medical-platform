import './MedicPage.css';

import Calendar from '../../components/calendar/Calendar';
import { db, auth } from '../../config/Firebase';
import { collection, getDocs, getDoc, doc, addDoc, query, where} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../../config/MapsAPI';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

function MedicPage() {
    const [selectedDate, setDate] = useState(null)

    // state para consultar dados
    const [userData, setUserData] = useState([]);
    const [userID, setUserID] = useState("");

    // carregando api google maps
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
      });

    // hook para puxar a url de referencia
    let {medicoId} = useParams();

    // puxando dados do medico
    const medicoRef = doc(db, "medicos", medicoId);
    const [medico, setMedico] = useState([]); 

    // puxando dados do médico
    useEffect(() => {
        const getMedico = async () => {
            const docSnap = await getDoc(medicoRef)
            setMedico(docSnap.data())
        };
        getMedico();
    }, [])

    // puxando dados do usuário
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserID(user.uid);
                console.log(user.uid)

                const userRef = doc(db, "clientes", userID);
                const docUser = await getDoc(userRef)
                setUserData(docUser.data())
                console.log(userData.nome)
            } else {
                console.log("Usuário não está logado!") 
            }
        });
    }, [])

    const collectionRef = collection(db, "consultas")

    const criarConsulta = async () => {

        document.getElementById('categoriaSelect');
        var sCategoria = document.getElementById('categoriaSelect');
        var valorCategoria = sCategoria.options[sCategoria.selectedIndex].value;

        document.getElementById('convenioSelect');
        var sConvenio = document.getElementById('convenioSelect');
        var valorConvenio = sConvenio.options[sConvenio.selectedIndex].value;

        var date = new Date(selectedDate); // converte para data
        date.toLocaleDateString("pt-BR")
         //formata de acordo com o requisito

        await addDoc(collectionRef, {
            nameUser: userData.nome,
            userID: userData.id,
            nameMedic: medico.nome,
            medicID: medico.id_user,
            date_hour: date,
            status: "Consulta criada",
            userTel: userData.telefone,
            categoria: valorCategoria,
            convenio: valorConvenio,
        });
    };

    // render
    return(
        <>
            <div className="main-medic-page">
                <div className="medic-info">
                    <div className="profile-photo">
                        <img src={medico.profile_photo} alt="" />
                    </div>
                    <div className="name-and-speciality">
                        <strong className='name'>{medico.nome} {medico.sobrenome}</strong>
                        <span className='speciality'>{medico.especialidade}</span>
                        <span className='crm'>Numero de registro: <strong>{medico.crm}</strong></span>
                    </div>
                </div>
                <div className="schedules-and-create">
                    <div className="title">
                        <h3>Agendar consulta</h3>
                    </div>
                    <div className="type">
                        <select className='type' id='categoriaSelect'>
                            <option value="0">Selecione uma categoria</option>
                            <option value={medico.categoria_aceita}>{medico.categoria_aceita}</option>
                        </select>
                    </div>
                    <div className="plan">
                        <h3>Selecione seu plano</h3>
                        <select className='plan' id='convenioSelect'>
                            <option value="0">Selecione um plano</option>
                            <option value="Particular">Particular</option>
                            <option value={medico.convenio_aceito}>{medico.convenio_aceito}</option>
                        </select>
                    </div>
                    <div className="localization">
                        <h3>Endereço</h3>
                        <div className="loc-details">
                            <div className="loc-text">
                                <strong>{medico.nome_clinica}</strong>
                                <span>{medico.end_rua}, {medico.end_num} - {medico.end_bairro} | {medico.end_cep}</span>
                            </div>
                            <div className="loc-googlemaps">
                            {
                                  isLoaded ? (
                                    <GoogleMap
                                      mapContainerStyle={{width: '100%', height: '100%'}}
                                      center={{
                                        lat: medico.lat,
                                        lng: medico.lng,
                                      }}
                                      zoom={15}
                                    >
                                      <Marker position={{
                                        lat: medico.lat,
                                        lng: medico.lng
                                      }}/>
                                      <></>
                                    </GoogleMap>
                                ) : <></>
                        }
                            </div>
                        </div>
                    </div>
                    <div className="schedules">
                        <h3>Data e hora</h3>
                        <div className="select-schedules">
                            <div className="date">
                                <ReactDatePicker selected={selectedDate} onChange={date=>setDate(date)} showTimeSelect/>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="create-btn">
                        <button onClick={criarConsulta}>Agendar consulta</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MedicPage;