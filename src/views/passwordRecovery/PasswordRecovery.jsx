import "./PasswordRecovery.css";

function PasswordRecovery(){
    return(
        <>
            <div className="main-recoverypass-container">
                <div className="recovery-card">
                    <h3>Insira seu email ou CPF</h3>
                    <input type="text" placeholder="Email ou CPF"/>
                    <button>Enviar</button>
                </div>
            </div>
        </>
    );
};

export default PasswordRecovery;