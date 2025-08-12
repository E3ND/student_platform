import axios from "axios";
import { useContext, useEffect, useState } from "react"
import Students from "../../components/Student";
import type { IStudent } from "../../interfaces/studentsTypes";
import { AuthContext } from "../../context/UserProvider";
import { ReloadContext } from "../../context/reloadProvider";

export default function Home() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");

    const [studentData, setStudentData] = useState<IStudent[]>([]);

    const [pointerBlocker, setPointerBlocker] = useState('form_button_block');

    const [isLoading, setIsloading] = useState(false);

    const {reload, setReload} = useContext(ReloadContext)!;

    const { getToken } = useContext(AuthContext);

    const [token, setToken] = useState(getToken);

    useEffect(() => {
         console.log("error");
        axios.get("http://localhost:3333/student/", {}).then(function (response) {
            const { data } = response.data
            setStudentData(data);
            // setIsloading(prev => !prev);
        })
        .catch(function (error) {
            console.log(error);
        });

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

        axios.post("http://localhost:3333/student/create", {
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
            console.log(error);
        });
    }

    return(
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
                <button className={pointerBlocker} onClick={createStudent}>Criar aluno</button>
            </div>

            {isLoading && studentData.length === 0 ? (
                <h3>Nenhum aluno cadastrado</h3>
            ) : (
                studentData.map((student) => (
                    <Students key={student.id} studentsData={student} />
                ))
            )}
        </div>
    )
}