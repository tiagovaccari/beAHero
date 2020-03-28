import React, {useState} from 'react'
import './styles.css';
import logoImage from "../../assets/logo.svg";
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongID = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title, 
            description, 
            value,
        }

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongID,
                }
            })
            history.push('/profile');
        }catch(err){
            alert("Erro ao inserir o incidente, tente novamente");
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be a Hero"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva detalhadamente o seu problema</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                            Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descricao do Caso"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    />

                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e=>setValue(e.target.value)}
                    />

                    <button className='button'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}