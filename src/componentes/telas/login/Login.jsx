import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../../seguranca/Autenticacao';
import jwt_decode from "jwt-decode";
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import './signin.css';

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null); // Novo estado de erro

    const acaoLogin = async () => {
        const tokenEndpoint = "http://177.22.91.106:8080/login";
      
        const body = {
            "email": email,
            "senha": senha
        }
        
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };
      
        try {
          setCarregando(true);
          const response = await fetch(tokenEndpoint, requestOptions);
          console.log(response);
          if (!response.ok) {
            throw new Error('Falha ao obter o token de autenticação.');
          }
      
          const responseBody = await response.text();
          const responseJson = JSON.parse(responseBody);
          const accessToken = responseJson.token;
          
          let decodedAccessToken = jwt_decode(accessToken);

          let json = {
            username: email,
            auth: true,
            token: accessToken,
            //roles: [decodedAccessToken.realm_access.roles]
          }
          setAutenticado(true);
          gravaAutenticacao(json);

          return accessToken;
        } catch (error) {
          console.error(error);
          setErro("Email ou senha incorretos."); // Defina o estado de erro
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            setAlerta({ status: "error", message: err })
        }
    }, []);

    if (autenticado === true) {
        return <Navigate to="/privado" />
    }

    return (
        <div>
            <Carregando carregando={carregando}>
                <div>
                    <body className="text-center">
                        {erro && (
                            <div className="alert alert-danger">{erro}</div>
                        )}
                        <Alerta alerta={alerta} />
                        <main className="form-signin">
                            <form onSubmit={acaoLogin}>
                                <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>

                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${erro ? 'is-invalid' : ''}`} 
                                        id="floatingInput"
                                        placeholder="Nome de usuário"
                                        value={email}
                                        name="email"
                                        onChange={e => setEmail(e.target.value)} />
                                    <label htmlFor="floatingInput">Email</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className={`form-control ${erro ? 'is-invalid' : ''}`} 
                                        id="floatingPassword"
                                        placeholder="Senha"
                                        value={senha}
                                        name="senha"
                                        onChange={e => setSenha(e.target.value)} />
                                    <label htmlFor="floatingPassword">Senha</label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
                            </form>
                        </main>
                    </body>
                </div>
            </Carregando>
        </div>
    )
}

export default Login;
