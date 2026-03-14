import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";

export default function Login() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  const navigate = useNavigate();

  async function handleLogin(){

    const user = await createUser(name,email);

    localStorage.setItem("userId",user.id);

    navigate("/dashboard");

  }

  return (
    <div>

      <h1>L&L</h1>

      <input
        placeholder="Nome"
        onChange={e=>setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={e=>setEmail(e.target.value)}
      />

      <button onClick={handleLogin}>
        Entrar
      </button>

    </div>
  )
}