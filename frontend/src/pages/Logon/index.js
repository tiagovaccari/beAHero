import React, {useState} from 'react'
import {FiLogIn} from 'react-icons/fi'
import heroesImage from "../../assets/heroes.png"
import logoImage from "../../assets/logo.svg"
import {Link, useHistory} from 'react-router-dom';
import './styles.css'
import api from '../../services/api'


export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        }catch{
            alert("Falha ao tentar Logar")
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faca seu logon</h1>
                    <input 
                        placeholder="Seu ID"
                        value={id}
                        onChange={e=> setId(e.target.value)}
                    />
                    <button className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Nao tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes"/>
        </div>
    );
}