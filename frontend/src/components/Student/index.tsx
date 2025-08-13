import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import type { IStudent, IUser } from "../../interfaces/studentsTypes.js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { format } from "date-fns";
import { AuthContext } from "../../context/UserProvider.js";
import { ReloadContext } from "../../context/reloadProvider.js";
import WarningBar from "../WarningBar/index.js";

interface StudentsProps {
    studentsData: IStudent;
}

export default function Students({ studentsData }: StudentsProps) {
    const [showForm, setShowForm] = useState(false);

    const [id, setId] = useState(studentsData.id);
    const [name, setName] = useState(studentsData.name);
    const [age, setAge] = useState(studentsData.age);
    const [course, setCourse] = useState(studentsData.course);

    const [pointerBlocker, setPointerBlocker] = useState('form_button_free');
    const [iconBlocker, setIconBlocker] = useState('icon_free');

    const {reload, setReload} = useContext(ReloadContext)!;

    const { getToken } = useContext(AuthContext);

    const [token, setToken] = useState(getToken);

    const [authenticatedUser, setAuthenticatedUser] = useState<IUser | null>(null);
    const [erroLog, setErrorLog] = useState<string | null>(null);

    const backUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if(!token) return;

        axios.get(`${backUrl}/user/verify-token`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",  
            }
        })
        .then(function (response) {
            const { data } = response.data;
            setAuthenticatedUser(data);
        })
        .catch(function (error) {
            setErrorLog(error.response.data.message);
        });
        
        setErrorLog(null);
    }, [])

    useEffect(() => {
        if (!authenticatedUser?.id) return setIconBlocker("icon_block");

        if (authenticatedUser.id === studentsData.user.id) {
            setIconBlocker("icon_free");
        } else {
            setIconBlocker("icon_block");
        }
    }, [authenticatedUser, studentsData]);

    useEffect(() => {
        if (!name || !age || !course) {
            setPointerBlocker('form_button_block');
        } else {
            setPointerBlocker('form_button_free');
        }
    }, [name, age, course])

    async function deleteStudent(studentId: string) {
        if(iconBlocker === 'icon_block') return;

        axios.delete(`${backUrl}/student/delete/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",                
            }
        }).then(function (response) {
            console.log(response);
            setReload(!reload);
        })
        .catch(function (error) {
            setErrorLog(error.response.data.message);
        });
        setErrorLog(null);
    }

    async function updateStudent(studentId: string) {
        if(pointerBlocker === 'form_button_block') return;
        if(iconBlocker === 'icon_block') return;
        
        axios.put(`${backUrl}/student/update`, {
            id: studentId,
            name: name,
            age: parseInt(age),
            course: course,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(function (response) {
            setReload(!reload);
        })
        .catch(function (error) {
            setErrorLog(error.response.data.message);
        });

        setErrorLog(null);
        setShowForm(false);
    }

    function showStudentEditForm() {
        if(iconBlocker === 'icon_block') return;
        setShowForm(!showForm);
    }

    return (
        <div className="container">
            {erroLog && (
                <WarningBar message={erroLog} />
            )}
            <main className="box" key={studentsData.id}>
                <div className="fild_props">
                    <p>{studentsData.name}</p>
                </div>
                <div className="fild_props">
                    <p>{studentsData.age}</p>
                </div>
                <div className="fild_props">
                    <p>{studentsData.course}</p>
                </div>
                <div className="fild_props">
                    <p>Criado em {format(studentsData.createdAt, "dd/MM/yyyy")}</p>
                    <p>por: {studentsData.user.name}</p>
                </div>

                <div className="fild_props">
                    <span className={iconBlocker} onClick={() => deleteStudent(studentsData.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span>
                        <FontAwesomeIcon className={iconBlocker} onClick={showStudentEditForm} icon={faPenToSquare} />
                    </span>
                </div>
            </main>


            {showForm && (
                <div className="container_form">
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
                        <button className={pointerBlocker} onClick={() => updateStudent(id)}>Atualizar aluno</button>
                    </div>
                </div>
            )}
        </div>
    )
}