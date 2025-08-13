import { useEffect, useState } from "react";

type WarningBarProps = {
  message: string;
};

export default function WarningBar ({ message }: WarningBarProps) {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        // Usado para determinar quanto tempo a barra de aviso vai permanecer na tela
        setInterval(() => {
            setDisplay("none");
        }, 5000)
    }, [])

    return (
        <div className="warning_container" style={{ display: `${display}` }}>
            <div className="warning_box">
                <p>{message}</p>
            </div>
        </div>
    )
}