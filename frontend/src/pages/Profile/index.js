import React, {useEffect, useState} from 'react';
import './styles.css';
import logoImage from "../../assets/logo.svg"
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization: ongID,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    },[ongID]);

    async function handleDeleteIncident(id){
            try{
                await api.delete(`incidents/${id}`, {
                    headers: {
                        Authorization: ongID,
                    }
                })

                setIncidents(incidents.filter(incident => incident.id !== id))
            }catch(err){
                alert("Erro ao deletar caso, tente novamente");
            }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} typr="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>
                Casos Cadastrados
            </h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>{incident.title}</strong>
                        <p>Caso Test</p>

                        <strong>DESCRICAO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}