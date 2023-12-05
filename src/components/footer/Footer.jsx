import './Footer.css'

function Footer(){
    return(
        <>
            <div className="main-footer-container">
                <div className="footer-btn-container">
                <div className="service-container">
                    <h3>Serviço</h3>
                    <a href="">Sobre nós</a>
                    <a href="">Contato</a>
                    <a href="">Vagas</a>
                    <a href="">Termos e condições</a>
                </div>
                <div className="help-container">
                    <h3>Ajuda</h3>
                    <a href="">FAQ</a>
                    <a href="">Perguntas frequêntes</a>
                    <a href="">Reclame aqui</a>
                </div>
                <div className="contact-container">
                    <h3>Contato</h3>
                    <a href="">Email</a>
                    <a href="">WhatsApp</a>
                    <a href="">Telefone</a>
                </div>
                <div className="end-container">
                    <h3>FINDOCTOR</h3>
                    <p>Endereço</p>
                    <div className="social-media-container">
                        {/* inserir os icones das redes sociais */}
                    </div>
                </div>
                </div>
                <div className="copyrigth-container">
                    <h4>Criado por Cristian Freitas - Copyright©</h4>
                </div>
            </div>
        </>
    )
}

export default Footer