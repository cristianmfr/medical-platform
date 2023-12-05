import { useEffect, useState } from 'react';
import './SearchResults.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/Firebase';

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { API_KEY } from '../../config/MapsAPI';

import '../../components/medicCard/MedicCard.css'
import { Link } from 'react-router-dom';

function SearchResults() {

    // carregando api google maps
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
      });
    
    // puxando dados do db para consulta
    

    // query medicos
    const medicosRef = collection(db, "medicos");
    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        const getDoctor = async () => {
            const data = await getDocs(medicosRef)
            setMedicos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getDoctor();
    }, [])

    const handleSearch = async ()=> {
        document.getElementById('selectCategory');
        var sCategory = document.getElementById('selectCategory');
        var valorCategoria = sCategory.options[sCategory.selectedIndex].value;

        document.getElementById('selectConvenio');
        var sConvenio = document.getElementById('selectConvenio');
        var valorConvenio = sConvenio.options[sConvenio.selectedIndex].value;

        document.getElementById('selectEspecialidade');
        var sEspecialidade = document.getElementById('selectEspecialidade');
        var valorEspecialidade = sEspecialidade.options[sEspecialidade.selectedIndex].value;

        document.getElementById('selectBairro');
        var sBairro = document.getElementById('selectBairro');
        var valorBairro = sBairro.options[sBairro.selectedIndex].value;

        if (valorBairro == 0 && valorConvenio == 0 && valorEspecialidade == 0) {
            const data = await getDocs(medicosRef)
            setMedicos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        } else {
            const q = query(medicosRef, where("convenio_aceito", "==", valorConvenio), where("end_bairro", "==", valorBairro), where("especialidade", "==", valorEspecialidade));
            const dataFilter = await getDocs(q);
            setMedicos(dataFilter.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
    }

    // query convenios
    const conveniosRef = collection(db, "convenios");
    const [convenios, setConvenios] = useState([]);

    useEffect(() => {
        const getConvenios = async () => {
            const data = await getDocs(conveniosRef)
            setConvenios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getConvenios();
    }, []);

    // query especialidades
    const especialidadesRef = collection(db, "especialidades")
    const [especialidades, setEspecialidades] = useState([])

    useEffect(() => {
        const getEspecialidades = async () => {
            const data = await getDocs(especialidadesRef)
            setEspecialidades(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getEspecialidades();
    }, [])

    // query categorias de atendimento
    const categoriasRef = collection(db, "categorias_de_atendimento");
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const getCategorias = async () => {
            const data = await getDocs(categoriasRef)
            setCategorias(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getCategorias();
    }, []);

    // query bairros para filtros
    const bairrosRef = collection(db, "bairros_vitoria");
    const [bairros, setBairros] = useState([])

    useEffect(() => {
        const getBairros = async () => {
            const data = await getDocs(bairrosRef)
            setBairros(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getBairros();
    }, []);

    // render
    return(
        <>
            <div className="main-searchresults-container">
                <div className="search-and-filter">
                    <div className="search-filters">
                        <select className='category' id='selectCategory'>
                            <option value={0}>Selecione uma categoria</option>
                            {categorias.map((categoria) => {
                                return (
                                    <option value={categoria.categoria}>
                                        {categoria.categoria}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='plans' id='selectConvenio'>
                            <option value={0} >Selecione um convênio</option>
                            {convenios.map((convenio) => {
                                return (
                                    <option value={convenio.nome}>
                                        {convenio.nome}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='speciality' id='selectEspecialidade'>
                            <option value={0}>Selecione uma especialidade</option>
                            {especialidades.map((especialidade) => {
                                return (
                                    <option value={especialidade.nome}>
                                        {especialidade.nome}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='region' id='selectBairro'>
                            <option value={0}>Selecione um bairro</option>
                            {bairros.map((bairro) => {
                                return (
                                    <option value={bairro.nome}>
                                        {bairro.nome}
                                    </option>
                                )
                            })}
                        </select>
                        <button onClick={handleSearch}>Pesquisar</button>
                    </div>
                </div>
                <div className="results-container">
                    <div className="results">
                        <ul>
                            {medicos.map((medico) => {
                                return (
                                    <div className="medic-info">
                                        <div className="info-container">
                                            <div className="profile-photo">
                                                <img src={medico.profile_photo} alt="" />
                                            </div>
                                        <div className="name-and-speciality">
                                            <strong className='name'>{medico.nome}</strong>
                                            <span className='speciality'>{medico.especialidade}</span>
                                            <span className='crm'>{medico.crm}</span>
                                            <span>Convenios aceitos: {medico.convenio_aceito}</span>
                                        </div>
                                    </div>
                                    <div className="more-info-btn">
                                        <Link to={`/medic/${medico.id_user}`}>Ver mais</Link>
                                    </div>
                                </div>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="maps">
                        {
                                  isLoaded ? (
                                    <GoogleMap
                                      mapContainerStyle={{width: '100%', height: '100%'}}
                                      center={{
                                        lat: -20.260257,
                                        lng: -40.267487,
                                      }}
                                      zoom={15}
                                    >
                                      {medicos.map((medico) => {
                                        return(
                                            <Marker position={{
                                                lat: medico.lat,
                                                lng: medico.lng
                                            }}/>
                                        )
                                      })}
                                      <></>
                                    </GoogleMap>
                                ) : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchResults