import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import type { IStudent } from "../../interfaces/studentsTypes.js";
import axios from "axios";
import { useEffect, useState } from "react";

import "./styles.css";
import { format } from "date-fns";

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

    useEffect(() => {
        if (!name || !age || !course) {
            setPointerBlocker('form_button_block');
        } else {
            setPointerBlocker('form_button_free');
        }
    }, [name, age, course])

    async function deleteStudent(studentId: string) {
        axios.delete(`http://localhost:3333/student/delete/${studentId}`, {}).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async function updateStudent(studentId: string) {
        console.log(pointerBlocker)
        if(pointerBlocker === 'form_button_block') return;
        
        axios.put("http://localhost:3333/student/update", {
            id: studentId,
            name: name,
            age: parseInt(age),
            course: course,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });

        setShowForm(false);
    }

    function showStudentEditForm() {
        setShowForm(!showForm);
    }

    return (
        <div className="container">
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
                </div>
                <div className="fild_props">
                    <span onClick={() => deleteStudent(studentsData.id)} >
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span>
                        <FontAwesomeIcon onClick={showStudentEditForm} icon={faPenToSquare} />
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