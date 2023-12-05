import './Business.css'

import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Business(){
    return(
        <>
            <div className="main-login-container">
                <div className="login-container">
                    <h2>Selecione uma opção</h2>
                    <div className="form-container">
                        <Link to={"../medic-login"}>Já sou cadastrado</Link>
                        <Link to={"../medic-signup"}>Quero me cadastrar</Link>
                    </div>
                    <div className="divider"></div>
                    <div className="more-actions-container">
                        <a href="">Precisa de ajuda?</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Business;