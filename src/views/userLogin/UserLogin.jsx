// style
import './UserLogin.css'

// importando modulo de rotas
import { Link } from 'react-router-dom'

// importando controller de login
import { loginUser } from '../../controller/auth/userAuth/UserLoginController'

function UserLogin(){
    // importando do controller
    const {
        input,
        getInput,
        password,
        getPassword,
        loginProcess,
        login,
    } = loginUser()

    return(
        <>
            <div className="main-login-container">
                <div className="login-container">
                    <h2>Faça seu login</h2>
                    <div className="form-container">
                        <input type="text" placeholder='Informe seu email ou CPF' onChange={(e) => getInput (e.target.value)}/>
                        <input type="password" placeholder='Informe sua senha' onChange={(e) => getPassword (e.target.value)}/>
                        <button type='button' onClick={login}>Login</button>
                    </div>
                    <div className="more-actions-container">
                        <Link to={"/recuperar-senha"}>Esqueceu sua senha?</Link>
                        <Link to={"/cadastro"}>Crie sua conta</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin