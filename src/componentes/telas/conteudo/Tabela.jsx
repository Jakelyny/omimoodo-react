import { useContext } from "react";
import ConteudoContext from "./ConteudoContext";
import Alerta from '../../comuns/Alerta';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(ConteudoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Conteudo</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {(listaObjetos == null || listaObjetos.length === 0) && <h1>Nenhum conteudo encontrado</h1>}
            {listaObjetos != null && listaObjetos.length > 0 && (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Id</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">texto</th>
                                <th scope="col">autor</th>
                                <th scope="col">imagem</th>
                                <th scope="col">ativo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.id}>
                                    <td align="center">
                                        <button className="btn btn-info"
                                            onClick={() =>{ editarObjeto(objeto.id) }}
                                            data-bs-toggle="modal" data-bs-target="#modalEdicao">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => { remover(objeto.id); }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <td>{objeto.id}</td>
                                    <td>{objeto.titulo}</td>
                                    <td>{objeto.texto}</td>
                                    <td>{objeto.autor}</td>
                                    <td>{objeto.imagem}</td>
                                    <td>{objeto.ativo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}            
        </div>
    )
}

export default Tabela;