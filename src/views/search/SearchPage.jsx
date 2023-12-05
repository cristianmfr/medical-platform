import './SearchPage.css'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { Link } from 'react-router-dom';

function SearchPage(){
        
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

    return(

        <>
            <div className="main-page-container">
                <div className="search-container">
                    <h3>Agende sua consulta agora</h3>
                    <p>Mais de 700 mil especialistas de saúde estão prontos para te ajudar</p>
                    <div className="search-box-container">
                        <select className='category'>
                            <option value="0">Selecione uma categoria</option>
                            {categorias.map((categoria) => {
                                return (
                                    <option value={categoria.categoria}>
                                        {categoria.categoria}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='plans'>
                            <option value="0">Selecione um convênio</option>
                            {convenios.map((convenio) => {
                                return (
                                    <option value={convenio.nome}>
                                        {convenio.nome}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='speciality'>
                            <option value="0">Selecione uma especialidade</option>
                            {especialidades.map((especialidade) => {
                                return (
                                    <option value={especialidade.nome}>
                                        {especialidade.nome}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='region'>
                            <option value="0">Selecione um bairro</option>
                            {bairros.map((bairro) => {
                                return (
                                    <option value={bairro.nome}>
                                        {bairro.nome}
                                    </option>
                                )
                            })}
                        </select>
                        <Link to={"../search-results"}>Pesquisar</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;