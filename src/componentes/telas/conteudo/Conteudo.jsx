import { useState, useEffect } from "react";
import ConteudoContext from "./ConteudoContext";
import { addConteudoAPI, getAllConteudosAPI, getConteudoByIdAPI, removeConteudoByIdAPI, updateConteudoAPI} 
    from '../../../servicos/services';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Conteudo(){

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        titulo : "",
        texto: "",
        autor: "",
        imagem: "",
        ativo: false
    });
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            titulo : "",
            texto: "",
            autor: "",
            imagem: "",
            ativo: false
        });
    }

    const editarObjeto = async id => {
        try{
            setEditar(true);
            setAlerta({ status: "", message: "" });
            const objetoAPI = await getConteudoByIdAPI(id);
            setObjeto(objetoAPI);
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (!objeto.titulo || !objeto.texto || !objeto.autor || !objeto.imagem) {
            setAlerta({ status: "Error", message: "Faltam informações" });
            return;
        }
        if(editar === true){
            try {
                let retornoAPI = await updateConteudoAPI(objeto);
                setAlerta({ status: "Updated", message: retornoAPI.titulo });
                setObjeto(retornoAPI);
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                let retornoAPI = await addConteudoAPI(objeto);
                setAlerta({ status: "Created", message: retornoAPI.titulo });
                setObjeto(retornoAPI);
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaConteudos();
    }

    const recuperaConteudos = async () => {
        setCarregando(true);
        let retornoAPI = await getAllConteudosAPI();
        if(retornoAPI === 0){
            setAlerta({ status: "Error", message: "Ops... você não tem acesso a essa página" });
            setCarregando(false);
            return;
        }
        if(retornoAPI == null){
            setAlerta({ status: "No Content", message: "Não existem conteudos cadastrados" });
            setListaObjetos(retornoAPI);
            setCarregando(false)
        }else{
            setListaObjetos(retornoAPI);
        }
        setCarregando(false);
    }

    const remover = async codigo => {
        try{
            if (window.confirm('Deseja remover este titulo')){
                let retornoAPI = await removeConteudoByIdAPI(codigo);
                setAlerta({status : "Removed",
                    message : retornoAPI.titulo});
                    recuperaConteudos();
            }
        }catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto , [name] : value});
    }

    useEffect(() => {
        recuperaConteudos();
    },[]);

    return (
        <ConteudoContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, 
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
            <Tabela/>
            </Carregando>
            
            <Form/>
        </ConteudoContext.Provider>
    )
}

export default WithAuth(Conteudo);