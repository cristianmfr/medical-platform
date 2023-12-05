import './Header.css'

// importanto hooks
import { useRef, useEffect, useState } from 'react'

// importando controller para validar login
import {validateAccountType} from '../../controller/auth/validateAccountType/ValidateAccountType'
import { signOut } from 'firebase/auth'

// importando link para nav
import { Link } from 'react-router-dom'
import { auth } from '../../config/Firebase'

function Header(){
    
    const {
        userLoginStatus,
        getLoginStatus,
        getAccountType,
        setRefButtons,
        buttonRef,
        setLinkRef,
        linkRef,
    } = validateAccountType()
    
    useEffect(() => {
        getLoginStatus();

        const validateType = async () => {
            if(userLoginStatus == 1) {
                getAccountType()
                setRefButtons()
            } else {
                console.log("Usuario n logado")
            }
        }
        validateType();
    },[])

    const logout = async () => {
        try {
            signOut(auth)
        } catch (err) {
            console.error(err);
        };
    }

    return(
        <>
            <div className="main-header-container">
                <div className="header-buttons-container">
                    <div className="logo-container">
                        <Link to={"/"}>FinDoctor</Link>
                    </div>
                    <div className="buttons-container">

                    </div>
                    <div className="account-container">
                        {userLoginStatus == 0 ? (
                            <div className="singed-out-container">
                                <Link to={"/user-login"}>Fazer login</Link>
                            </div>
                        ) : (
                            <div className="singed-in-container">
                                <Link to={linkRef}>Minha conta</Link>
                                <button onClick={logout}>Sair</button>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header