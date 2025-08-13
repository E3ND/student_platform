import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserProvider";
import WarningBar from "../../components/WarningBar";

export default function Register() {
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ pointerBlocker, setPointerBlocker ] = useState("");
    const [erroLog, setErrorLog] = useState<string | null>(null);

    const backUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (!name || !email || !password || !confirmPassword || password !== confirmPassword) {
            setPointerBlocker('form_button_block');
        } else {
            setPointerBlocker('form_button_free');
        }
    }, [name, email, password, confirmPassword])

    async function createUser() {
        if(pointerBlocker === 'form_button_block') return;

        axios.post(`${backUrl}/user/register`, {
            name: name,
            email: email,
            password: password
        }).then((response) => {
            const { token } = response.data;

            authToken(token);

            navigate("/");
        })
        .catch(function (error) {
            setErrorLog(error.response.data.message);
        });

        setErrorLog(null);
    }

    return (
        <div className="container_form">
            {erroLog && (
                <WarningBar message={erroLog} />
            )}
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
        