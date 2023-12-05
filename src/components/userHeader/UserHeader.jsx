import './UserHeader.css';

import { useEffect, useState, useParams } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

function UserHeader(){
    // salvando dados do usuário
    const [userData, setUserData] = useState([]);

    // puxar dados do usuário
    useEffect(() =>{
        onAuthStateChanged(auth, (user) => { 
            if (user) {
                    const getUserData = async () => {
                    const userDocSnap = await getDoc(doc(db, "clientes", user.uid));
                    setUserData(userDocSnap.data())
                }
                getUserData();
            } else {
                console.log("Usuário não está logado")
            }
        })
    }, [])

    return(
        <>
            <header>
                <div className="main-header-user">
                    <div className="logo-btn">
                        <Link to={"../"}><FontAwesomeIcon icon={faHouse} size="xl" /></Link>
                        <Link to={"../"}><FontAwesomeIcon icon={faRightFromBracket} size='xl' /></Link>
                    </div>
                    <div className="user-info">
                        <span>Olá, <strong>{userData.nome} {userData.sobrenome}</strong>!</span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default UserHeader;