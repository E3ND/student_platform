import axios from "axios";
import { useContext, useEffect, useState } from "react"
import Students from "../../components/Student";
import type { IStudent } from "../../interfaces/studentsTypes";
import { AuthContext } from "../../context/UserProvider";
import { ReloadContext } from "../../context/reloadProvider";
import { Link } from "react-router-dom";
import WarningBar from "../../components/WarningBar";

export default function Home() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");

    const [studentData, setStudentData] = useState<IStudent[]>([]);

    const [pointerBlocker, setPointerBlocker] = useState('form_button_block');

    const [isLoading, setIsloading] = useState(false);

    const {reload, setReload} = useContext(ReloadContext)!;

    const { getToken, logoutToken } = useContext(AuthContext);

    const [token, setToken] = useState(getToken);

    const [erroLog, setErrorLog] = useState<string | null>(null);

    const backUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        console.log()
        axios.get(`${backUrl}/student/`, {}).then(function (response) {
            const { data } = response.data
            setStudentData(data);
        })
        .catch(function (error) {
            setErrorLog(error.response.data.message);
        });

        setErrorLog(null);
    }, [reload])

    useEffect(() => {
        if (!name || !age || !course) {
            setPointerBlocker('form_button_block');
        } else {
            setPointerBlocker('form_button_free');
        }
    }, [name, age, course])

    async function createStudent() {
        if(pointerBlocker === 'form_button_block') return;

        axios.post(`${backUrl}/student/create`, {
            name: name,
            age: parseInt(age),
            course: course,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
        ).then(function (response) {
            console.log(response);
            setReload(!reload);
        })
        .catch(function (error) {
            setErrorLog(error.response.data.message);
        });
        setErrorLog(null);
    }

    function logout() {
        logoutToken();
        setToken(getToken());
        setStudentData([]);
        setReload(!reload);
    }

    return(
        <div className="container_form">
            {erroLog && (
                <WarningBar message={erroLog} />
            )}
        { token ? (
            <>
                <div className="form_box">
                    <p>Nome do aluno {name === '' ? <span>(Obrigatório)</span> : ''}</p>
                    <input className="input_style" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form_box">
                    <p>Idade do aluno {age === '' ? <span>(Obrigatório)</span> : ''}</p>
                    <input className="input_style" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>

                <div className="form_box">
                    <p>Nome do curso {course === '' ? <span>(Obrigatório)</span> : ''}</p>
                    <input className="input_style" type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
                </div>

                <div className="form_box">
                    <button className={pointerBlocker} onClick={createStudent}>Criar aluno</button>
                </div>
            </>
        ) : (
            <p className="container_link">Faça o login ou se cadastre para poder cadastrar um aluno <Link to="/login">fazer login</Link> ou <Link to="register">se registre</Link></p>
        ) }

            {isLoading && studentData.length === 0 ? (
                <h3>Nenhum aluno cadastrado</h3>
            ) : (
                studentData.map((student) => (
                    <Students key={student.id} studentsData={student} />
                ))
            )}

            <div className="form_box">
                <button className="form_button_free" onClick={logout}>Sair</button>
            </div>
        </div>
    )
}