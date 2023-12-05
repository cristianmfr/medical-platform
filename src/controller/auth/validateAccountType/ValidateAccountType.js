// react hook
import { useState } from 'react'

import {db, auth} from '../../../config/Firebase'
import { getDocs, collection, query, where, doc,  } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export const validateAccountType = () => {
    // verificando se existe alguem logado
    const [userLoginStatus, setUserLoginStatus] = useState(0)
    // ref para router
    const [buttonRef, setButtonRef] = useState("");
    const [linkRef, setLinkRef] = useState("");
    // uid do usuario se estiver logado
    const [userUID, setUserUID] = useState("");
    // salvando dados do usuario
    const [userData, setUserData] = useState([]);
    // tipo de conta
    const [accountType, setAccountType] = useState("");

    // all user ref
    const allUserRef = collection(db, "usuarios");

    // verificando status do login
    const getLoginStatus = async () => {
        onAuthStateChanged(auth, (user) => { 
            if (user) {
                setUserLoginStatus(1)
                setUserUID(user.uid)
            } else {
                setUserLoginStatus(0)
            };
        });
    };

    // verificando tipo de conta
    const getAccountType = async () => {
        const queryUser = query(allUserRef, where("id_user", "==", userUID))
        const data = await getDocs(queryUser)
        setUserData((data.docs.map((doc) => ({ ...doc.data(), id: doc.id}))))
        setAccountType(userData[0].tipo)
    }

    // alterando referencias de botoes
    const setRefButtons = async () => {
        if(accountType == "Cliente"){
            setLinkRef(`/user/config/${userUID}`)
        } else if (accountType == "Medico") {
            setLinkRef(`/medic/management/${userUID}`)
        } else {
            console.log("Sem usuário logado")
        }
    }

    return{
        userLoginStatus,
        getLoginStatus,
        getAccountType,
        setRefButtons,
        buttonRef,
        setLinkRef,
        linkRef,
    }

}