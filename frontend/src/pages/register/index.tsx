import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserProvider";

export default function Register() {
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ pointerBlocker, setPointerBlocker ] = useState("");

    useEffect(() => {
        if (!name || !email || !password || !confirmPassword || password !== confirmPassword) {
            setPointerBlocker('form_button_block');
        } else {
            setPointerBlocker('form_button_free');
        }
    }, [name, email, password, confirmPassword])

    async function createUser() {
        if(pointerBlocker === 'form_button_block') return;

        axios.post("http://localhost:3333/user/register", {
            name: name,
            email: email,
            password: password
        }).then((response) => {
            const { token } = response.data;

            authToken(token);

            navigate("/");
        })
        .catch(function (error) {
            console.log("aa", error.response.data.message);
        });
    }

    return (
        <div className="container_form">
            <div className="form_box">
                <p>Nome {name === '' ? <span>(Obrigatório)</span> : ''}</p>
                <input className="input_style" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
        
            <div className="form_box">
                <p>Email {email === '' ? <span>(Obrigatório)</span> : ''}</p>
                <input className="input_style" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
        
            <div className="form_box">
                <p>Senha {password === '' ? <span>(Obrigatório)</span> : ''}</p>
                <input className="input_style" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
        
            <div className="form_box">
                <p>Confirme senha {confirmPassword !== password ? <span>(As senhas devem ser iguais)</span> : ''}</p>
                <input className="input_style" type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
        
            <div className="form_box">
                <button className={pointerBlocker} onClick={createUser}>Criar aluno</button>
            </div>
        </div>  

    )
}
        