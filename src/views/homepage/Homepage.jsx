import './Homepage.css'

// importanto fontawesome para icones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCalendar, faCircleExclamation, faHeart } from '@fortawesome/free-solid-svg-icons'

// importando modulo link para nav
import { Link } from 'react-router-dom'

function Homepage(){
    return(
        <>
            <body>
                <div className="main-home-container">
                    <div className="banner-info-container">
                        <div className="left-container">
                            <div className="text-info-container">
                                <strong>
                                    Bem vindo ao FinDoctor!
                                </strong>
                                <p>
                                    Agende consultas com médicos de forma fácil e segura. Especialistas em diversas áreas prontos para atendê-lo. Sua saúde, nossa prioridade.
                                </p>
                            </div>
                            <div className="button-container">
                                <Link to={"/search"}>BUSCAR PROFISSIONAIS</Link>
                                <Link to={"business"}>SOU MÉDICO</Link>
                            </div>
                        </div>
                        <div className="right-container"></div>
                    </div>
                    <div className="info-help-container">
                        <div className="find">
                            <strong><i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>Encontre especialistas</strong>
                            <p>Busque por especialistas de saúde em sua região. Filtre por planos de saúde, tratamentos ou disponibilidade.</p>
                        </div>
                        <div className="take">
                            <strong><i><FontAwesomeIcon icon={faCalendar} /></i>Marque consultas</strong>
                            <p>Escolha o profissional, dia e horário que desejar, agendando sua consulta em até dois minutos. Sem complicação.</p>
                        </div>
                        <div className="notification">
                            <strong><i><FontAwesomeIcon icon={faCircleExclamation} /></i>Receba lembretes</strong>
                            <p>Confirmamos tudo imediatamente pelo email informado e, antes da consulta, um lembrete será enviado via celular.</p>
                        </div>
                        <div className="evaluate">
                            <strong><i><FontAwesomeIcon icon={faHeart} /></i>Avalie o serviço</strong>
                            <p>Após a consulta você poderá deixar sua opinião sobre o serviço. Tudo isso de forma gratuita, simples e rápida.</p>
                        </div>
                    </div>
                    <div className="more-info-business">
                        <div className="image-container">

                        </div>
                        <div className="text-info-container-2">
                            <strong>Você atua na área da saúde?</strong>
                                <div className="parag">
                                    <p>Conecte-se com os pacientes que procuram o seu serviço, na sua região.</p>
                                    <p>Deixe que os pacientes agendem 24h por dia. Chega de esperar pelo horário comercial!</p>
                                    <p>Fortaleça sua reputação online coletando avaliações verificadas.</p>
                                </div>
                            <Link to={"medic-signup"}>Cadastre-se agora</Link>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}

export default Homepage