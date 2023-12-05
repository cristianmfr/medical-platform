import './AccountConfig.css';

import { useEffect, useState, useRef } from 'react';

// importanto auth
import {db, auth} from '../../../config/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function AccountConfig() {
    // salvando dados do usuário
    const [userData, setUserData] = useState([]);
    const [newUserData, setNewUserData] = useState([]);

    // puxando id do usuário
    let {userId} = useParams();

    // ref usuario
    const userRef = doc(db, "clientes", userId);

    // puxar dados do usuário
    useEffect(() =>{
        const getUserData = async () => {
            const userDocSnap = await getDoc(userRef);
            setUserData(userDocSnap.data())
        }
        getUserData();
    }, [])

    // edit user data
    const editUserData = async () => {
        await setDoc(userRef, {
            nome: userData.nome,
            sobrenome: userData.sobrenome,
            telefone: userData.telefone,
        })
    }


    return(
        <>
            <body>
                <div className="main-user-container">
                    <div className="account-config">
                        <h3>Configurações de conta</h3>
                        <div className="form-user-config">
                            <div className="name-label-input">
                                <span>Nome</span>
                                <input type="text" placeholder="Nome" defaultValue={userData.nome}/>
                            </div>
                            <div className="surname-label-input">
                                <span>Sobrenome</span>
                                <input type="text" placeholder="Sobrenome" defaultValue={userData.sobrenome}/>
                            </div>
                            <div className="tel-label-input">
                                <span>Telefone</span>
                                <input type="text" placeholder="Telefone" defaultValue={userData.telefone}/>
                            </div>
                            <div className="email-label-input">
                                <span>Email</span>
                                <input type="email" placeholder="Email" defaultValue={userData.email} disabled/>
                            </div>
                        </div>
                        <button>Alterar Configurações</button>
                        <div className="password-change">
                            <h3>Alterar senha</h3>
                            <input type="text" placeholder="Insira sua senha atual" />
                            <input type="text" placeholder="Insira sua nova senha" />
                            <input type="text" placeholder="Confirme sua nova senha" />
                        <button>Alterar senha</button>
                    </div>
                    </div>
                </div>
            </body>
        </>
    );
};

export default AccountConfig;