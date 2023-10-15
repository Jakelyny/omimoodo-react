import { useContext } from "react";
import UsuarioContext from "./UsuarioContext";
import Alerta from '../../comuns/Alerta';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(UsuarioContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Usuário</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {(listaObjetos === null || listaObjetos.length === 0) && <h1>Nenhum Usuário encontrado</h1>}
            {listaObjetos != null && listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">id</th>
                            <th scope="col">nome</th>
                            <th scope="col">email</th>
                            <th scope="col">cpf</th>
                            <th scope="col">telefone</th>
                            <th scope="col">logradouro</th>
                            <th scope="col">bairro</th>
                            <th scope="col">cep</th>
                            <th scope="col">cidade</th>
                            <th scope="col">uf</th>
                            <th scope="col">numero</th>
                            <th scope="col">complemento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.id}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        onClick={() => editarObjeto(objeto.id)}
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto.id); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.email}</td>
                                <td>{objeto.cpf}</td>
                                <td>{objeto.telefone}</td>
                                <td>{objeto.endereco.logradouro}</td>
                                <td>{objeto.endereco.bairro}</td>
                                <td>{objeto.endereco.cep}</td>
                                <td>{objeto.endereco.cidade}</td>
                                <td>{objeto.endereco.uf}</td>
                                <td>{objeto.endereco.numero}</td>
                                <td>{objeto.endereco.complemento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;