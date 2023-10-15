import { useState, useEffect } from "react";
import UsuarioContext from "./UsuarioContext";
import { addUsuarioAPI, getAllUsuariosAPI, getUsuarioByIdAPI, removeUsuarioByIdAPI, updateUsuarioAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";

function Usuario(){

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: 0,
        nome : "",
        email: "",
        cpf: "",
        telefone: "",
        ativo: false,
        adm: false,
        endereco: {
            logradouro: "",
            bairro: "",
            cep: "",
            senha: "",
            cidade: "",
            uf: "",
            numero: "",
            complemento: ""
        }
    });
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: 0,
            nome : "",
            senha: "",
            email: "",
            cpf: "",
            telefone: "",
            ativo: false,
            adm: false,
            endereco: {
                logradouro: "",
                bairro: "",
                cep: "",
                cidade: "",
                uf: "",
                numero: "",
                complemento: ""
            }
        });
    }

    const editarObjeto = async id => {
        try{
            setEditar(true);
            setAlerta({ status: "", message: "" });
            const objetoAPI = await getUsuarioByIdAPI(id);
            setObjeto(objetoAPI);
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.nome || !objeto.email || !objeto.cpf || !objeto.telefone) {
            setAlerta({ status: "Error", message: "Faltam informações" });
            return;
        }
        if(editar === true){
            try {
                let retornoAPI = await updateUsuarioAPI(objeto);
                setAlerta({ status: "Updated", message: retornoAPI.nome });
                setObjeto(retornoAPI);
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                let retornoAPI = await addUsuarioAPI(objeto);
                setAlerta({ status: "Created", message: retornoAPI.nome });
                setObjeto(retornoAPI);
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaUsuarios();
    }

    const recuperaUsuarios = async () => {
        setCarregando(true);
        let retornoAPI = await getAllUsuariosAPI();
        if(retornoAPI === 0){
            setAlerta({ status: "Error", message: "Ops... você não tem acesso a essa página" });
            setCarregando(false);
            return;
        }
        if(retornoAPI == null){
            setAlerta({ status: "No Content", message: "Não existem sites cadastrados" });
            setListaObjetos(retornoAPI);
            setCarregando(false)
        }else{
            setListaObjetos(retornoAPI);
        }

        setCarregando(false);
    }

    const remover = async codigo => {
        try{
            if (window.confirm('Deseja remover este objeto')){
                let retornoAPI = await removeUsuarioByIdAPI(codigo);
                setAlerta({status : "Removed",
                    message : retornoAPI.nome});
                    recuperaUsuarios();
            }
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const handleChange = (e) => {
        console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        
        if (name.startsWith("endereco.")) {
          const addressField = name.split(".")[1];
          setObjeto({
            ...objeto,
            endereco: {
              ...objeto.endereco,
              [addressField]: value
            }
          });
        } else {
          setObjeto({
            ...objeto,
            [name]: value
          });
        }
      }
      

    useEffect(() => {
        recuperaUsuarios();
    },[]);

    return (
        <UsuarioContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </UsuarioContext.Provider>
    )
}

export default WithAuth(Usuario);