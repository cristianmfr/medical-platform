import { loginMedic } from '../../controller/auth/medicAuth/MedicLoginController';
import './MedicLogin.css'

function MedicLogin(){

    const {
        input,
        getInput,
        password,
        getPassword,
        logout,
        loginProcess,
    } = loginMedic()

    return(
        <>
            <div className="main-login-container">
                <div className="login-container">
                    <h2>Login profissional</h2>
                    <div className="form-container">
                        <input type="text" placeholder='Informe seu email ou CRM' onChange={(e) => getInput (e.target.value)}/>
                        <input type="password" placeholder='Informe sua senha' onChange={(e) => getPassword (e.target.value)}/>
                        <button type='button' onClick={loginProcess}>Login</button>
                    </div>
                    <div className="divider"></div>
                    <div className="more-actions-container">
                        <a href="">Precisa de ajuda?</a>
                        <a href="">Fazer login como clinica</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicLogin;