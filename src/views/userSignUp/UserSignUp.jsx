import './UserSignUp.css'

// importanto react router para DOM
import { Link } from 'react-router-dom'

// importando controller de autenticação
import { createUser } from '../../controller/auth/userAuth/UserSignUpController'

function UserSignUp(){

    // declarando objetos do metodo de cadastro
    const {
        name,
        surname,
        cpf,
        tel,
        email,
        password,
        confirmPass,
        setName,
        setSurname,
        setCpf,
        setTel,
        setEmail,
        setPassword,
        setConfirmPass,
        signUp,
    } = createUser();

    return(
        <>
        <div className="main-signup-container">
            <div className="signup-container">
                <h2>Crie uma conta</h2>
                    <div className="form-signup-container">
                        <input type="text" placeholder='Digite seu email' onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" placeholder='Digite seu CPF'onChange={(e) => setCpf(e.target.value)}/>
                        <div className="name-container">
                            <input type="text" placeholder='Digite seu nome' onChange={(e) => setName(e.target.value)}/>
                            <input type="text" placeholder='Digite seu sobrenome' onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <input type="text" placeholder='Insira seu endereço' />
                        <div className="user-adress">
                            <input type="text" placeholder='Número'/>
                            <input type="text" placeholder='CEP'/>
                        </div>
                        <input type="text" placeholder='Insira seu número de telefone' onChange={(e) => setTel(e.target.value)}/>
                        <input type="password" placeholder='Crie uma senha' onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" placeholder='Confirme sua senha'onChange={(e) => setConfirmPass(e.target.value)}/>
                    </div>
                    <div className="terms-container">
                            <input type="checkbox" />
                            <p>Ao preencher seus dados, você aceita que a FinDoctor o contate para estender a você seus serviços.</p>
                    </div>
                    <button onClick={signUp}>Cadastrar</button>
                    <div className="divider"></div>
                    <div className="login-rb">
                        <p>Já possuí uma conta? <Link to={"/login"}>Faça seu login</Link></p>
                    </div>
            </div>
        </div>
        </>
    )
}

export default UserSignUp