import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import WarningBar from "../../components/WarningBar";

export default function Login() {
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ pointerBlocker, setPointerBlocker ] = useState('form_button_block');
    const [erroLog, setErrorLog] = useState<string | null>(null);

    const backUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (!email || !password) {
            setPointerBlocker('form_button_block');
        } else {
            setPointerBlocker('form_button_free');
        }
    }, [email, password])

    async function createUser() {
        if(pointerBlocker === 'form_button_block') return;

        axios.post(`${backUrl}/user/login`, {
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
                <p>Email {email === '' ? <span>(Obrigatório)</span> : ''}</p>
                <input className="input_style" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form_box">
                <p>Senha {password === '' ? <span>(Obrigatório)</span> : ''}</p>
                <input className="input_style" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="form_box">
                <button className={pointerBlocker} onClick={createUser}>Logar</button>
            </div>
        </div>        
    )
}