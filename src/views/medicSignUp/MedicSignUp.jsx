import './MedicSignUp.css';

import { createMedicUser } from '../../controller/auth/medicAuth/MedicSignUpController';
import { useState, useEffect } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs } from 'firebase/firestore';

function MedicSignUp(){
    
    const{
        name,
        surname,
        cpf,
        crm,
        tel,
        email,
        specialty,
        clinic,
        adress,
        bairro,
        num,
        cep,
        password,
        confirmPass,
        img,
        imgURL,
        setName,
        setSurname,
        setCpf,
        setCrm,
        setTel,
        setEmail,
        setSpecialty,
        setClinic,
        setAdress,
        setCep,
        setBairro,
        setNum,
        setPassword,
        setConfirmPass,
        setImgURL,
        setImg,
        signUp,
    } = createMedicUser();

    const especialidadesRef = collection(db, "especialidades")
    const [especialidades, setEspecialidades] = useState([])

    useEffect(() => {
        const getEspecialidades = async () => {
            const data = await getDocs(especialidadesRef)
            setEspecialidades(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getEspecialidades();
    }, [])

    return(
        
        <>
        <div className="main-medic-signup-container">
            <div className="medic-signup-container">
                <h2>Crie uma conta</h2>
                    <div className="form-medic-signup-container">
                        <input type="email" placeholder='Digite seu email' onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" placeholder='Digite seu CPF' onChange={(e) => setCpf(e.target.value)}/>
                        <input type="text" placeholder='Digite seu CRM' onChange={(e) => setCrm(e.target.value)}/>
                        <div className="name-container">
                            <input type="text" placeholder='Digite seu nome'onChange={(e) => setName(e.target.value)}/>
                            <input type="text" placeholder='Digite seu sobrenome'onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <div className="profile-photo-upload">
                            <h4>Escolha uma foto de perfil</h4>
                            <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
                        </div>
                        <div className="divider"></div>
                        <select id="specialty" className='specialty-select' onChange={e=>setSpecialty(e.target.value)}>
                                {especialidades.map((especialidade) => {
                                    return(
                                        <option value={especialidade.nome}>{especialidade.nome}</option>
                                    )
                                })}
                        </select>
                        <input type="text" placeholder='Insira o nome da sua clínica' onChange={(e) => setClinic(e.target.value)}/>
                        <div className="loc-form">
                            <input type="text" placeholder='Insira o nome da sua rua' onChange={(e) => setAdress(e.target.value)}/>
                            <input type="text" placeholder='Número'onChange={(e) => setNum(e.target.value)}/>
                            <input type="text" placeholder='CEP'onChange={(e) => setCep(e.target.value)}/>
                            <input type="text" placeholder='Bairro'onChange={(e) => setBairro(e.target.value)}/>
                        </div>
                        <div className="divider"></div>
                        <input type="tel" placeholder='Insira seu numero de telefone com DDD' onChange={(e) => setTel(e.target.value)}/>
                        <input type="password" placeholder='Crie uma senha' onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" placeholder='Confirme sua senha' onChange={(e) => setConfirmPass(e.target.value)}/>
                    </div>
                    <div className="terms-container">
                            <input type="checkbox" />
                            <p>Ao preencher seus dados, você aceita que a FinDoctor o contate para estender a você seus serviços.</p>
                    </div>
                    <button onClick={signUp}>Cadastrar</button>
            </div>
        </div>
        </>
    )
}

export default MedicSignUp