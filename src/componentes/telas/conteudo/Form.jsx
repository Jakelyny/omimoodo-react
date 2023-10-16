import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import ConteudoContext from './ConteudoContext';

function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(ConteudoContext);

    return (
        <Dialogo id="modalEdicao" titulo="Conteúdo" idformulario="formEdicao" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada
                id="txtNome"
                label="Título"
                tipo="text"
                name="titulo"
                value={objeto.titulo}
                handlechange={handleChange}
                requerido={true}
                readonly={false}
                textovalido="Título OK"
                textoinvalido="Informe o título"
                maximocaracteres={100}
            />
            <CampoEntrada
                id="txtTexto"
                label="Texto"
                tipo="textarea"
                name="texto"
                value={objeto.texto}
                handlechange={handleChange}
                requerido={true}
                readonly={false}
                textovalido="Texto OK"
                textoinvalido="Informe o texto"
            />
            <CampoEntrada
                id="txtAutor"
                label="Autor"
                tipo="text"
                name="autor"
                value={objeto.autor}
                handlechange={handleChange}
                requerido={true}
                readonly={false}
                textovalido="Autor OK"
                textoinvalido="Informe o autor"
                maximocaracteres={40}
            />
            <CampoEntrada
                id="txtImagem"
                label="Imagem"
                tipo="text"
                name="imagem"
                value={objeto.imagem}
                handlechange={handleChange}
                requerido={true}
                readonly={false}
                textovalido="Imagem OK"
                textoinvalido="Informe a imagem"
            />
            {/* <div className="form-group">
                <label htmlFor="ativo">Status:</label>
                <select
                    className="form-control"
                    id="ativo"
                    name="ativo"
                    value={objeto.ativo}
                    onChange={handleChange}
                >
                    <option value={true}>Ativo</option>
                    <option value={false}>Inativo</option>
                </select>
            </div> */}
        </Dialogo>
    );
}

export default Form;
