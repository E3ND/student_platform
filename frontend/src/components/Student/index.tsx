import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import type { IStudent } from "../../interfaces/studentsTypes";
import axios from "axios";
import { useState } from "react";

interface StudentsProps {
    studentsData: IStudent;
}

export default function Students({ studentsData }: StudentsProps) {
    const [showForm, setShowForm] = useState(false);
    const [id, setId] = useState(studentsData.id);
    const [name, setName] = useState(studentsData.name);
    const [age, setAge] = useState(studentsData.age);
    const [course, setCourse] = useState(studentsData.course);

    async function deleteStudent(studentId: string) {
        axios.delete(`http://localhost:3333/student/delete/${studentId}`, {}).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
                console.log(error);
        });
    }

    async function updateStudent(studentId: string) {
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
        <div>
            <main key={studentsData.id}>
                <div>
                    <p>{studentsData.name}</p>
                </div>
                <div>
                    <p>{studentsData.age}</p>
                </div>
                <div>
                    <p>{studentsData.course}</p>
                </div>
                <div>
                    <p>{studentsData.createdAt.toString()}</p>
                </div>
                <div>
                    <span onClick={() => deleteStudent(studentsData.id)} >
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span>
                        <FontAwesomeIcon onClick={showStudentEditForm} icon={faPenToSquare} />
                    </span>
                </div>
            </main>


            {showForm && (
                <div>
                    <div>
                        <p>Nome do aluno</p>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <p>Idade do aluno</p>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div>
                        <p>Nome do curso</p>
                        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
                    </div>

                    <div>
                        <button onClick={() => updateStudent(id)}>Atualizar aluno</button>
                    </div>
                </div>
            )}
        </div>
    )
}