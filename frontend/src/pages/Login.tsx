

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginForm {
    email: string;
    password: string;
}


function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }

  }, [navigate]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", data);
      const token = response.data.token;
      
      localStorage.setItem("authToken", token);
      navigate("/tarefas");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Credenciais inválidas");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="col-12 col-md-10 m-auto d-flex justify-content-end">
        <div className="col-6 text-start">
          <h1>Login</h1>
          <div className="col-12">
            <input type="text" className="form-control"  placeholder="Usuário"
            {...register("email", { required: "O e-mail é obrigatório" })}
            />
          </div>
          <div className="col-12 mt-1">
            <input type="password" className="form-control" placeholder="Senha"
            {...register("password", { required: "A senha é obrigatória" })}
            />
          </div>
          <div className="col-12 mt-1">
            <a href='/cadastrausuario'>Cadastre-se</a>
          </div>
          <div className="col-12 mt-1">
            <button type="submit" className='btn btn-primary'>ACESSAR</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
