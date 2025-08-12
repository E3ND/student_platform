import axios from "axios";
import { useEffect, useState } from "react"
import Students from "../../components/Student";
import type { IStudent } from "../../interfaces/studentsTypes";

export default function Home() {
    const [ name, setName ] = useState("");
    const [ age, setAge ] = useState("");
    const [ course, setCourse ] = useState("");
    const [ studentData, setStudentData ] = useState<IStudent[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3333/student/", {}).then(function (response) {
            const { data } = response.data
            setStudentData(data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [studentData])

    async function createStudent() {
        axios.post("http://localhost:3333/student/create", {
            name: name,
            age: parseInt(age),
            course: course,
        }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
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
                <button onClick={createStudent}>Criar aluno</button>
            </div>

            {studentData.length === 0 ? (
                <h3>Nenhum aluno cadastrado</h3>
            ) : (
                studentData.map((student) => (
                    <Students studentsData={student} />
                ))
            )}
        </div>
    )
}