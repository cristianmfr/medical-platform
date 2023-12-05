import './MedicCard.css'

function MedicCard() {
    return(
        <>
            <div className="medic-info">
                <div className="info-container">
                    <div className="profile-photo">
                        </div>
                            <div className="name-and-speciality">
                                <strong className='name'>Nome do médico</strong>
                                <span className='speciality'>Especialidade</span>
                                <span className='crm'>Nome da rua, 100 - Estado</span>
                                <span>Planos aceitos: </span>
                            </div>
                    </div>
                <div className="more-info-btn">
                    <button>Ver mais</button>
                </div>
            </div>
        </>
    );
};

export default MedicCard;