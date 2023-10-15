import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import UsuarioContext from './UsuarioContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(UsuarioContext);

    return (
        <Dialogo id="modalEdicao" titulo="MaliciousProcess" idformulario="formEdicao"
        acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtNome" label="nome" tipo="text"
                name="nome" value={objeto.nome}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="nome OK" textoinvalido="Informe o nome"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="email" tipo="text"
                name="email" value={objeto.email}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="email OK" textoinvalido="Informe o email"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="senha" tipo="text"
                name="senha" value={objeto.senha}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="senha OK" textoinvalido="Informe o senha"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="cpf" tipo="text"
                name="cpf" value={objeto.cpf}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="cpf OK" textoinvalido="Informe o cpf"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="telefone" tipo="text"
                name="telefone" value={objeto.telefone}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="telefone OK" textoinvalido="Informe o telefone"
                maximocaracteres={40} />
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ativo"
                name="ativo"
                value={objeto.ativo}
                onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="ativo">
                    Ativo
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="adm"
                name="adm"
                value={objeto.adm}
                onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="adm">
                    Adm
                </label>
            </div>
            <CampoEntrada id="txtNome" label="logradouro" tipo="text"
                name="endereco.logradouro" value={objeto.endereco.logradouro}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="logradouro OK" textoinvalido="Informe o logradouro"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="bairro" tipo="text"
                name="endereco.bairro" value={objeto.endereco.bairro}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="bairro OK" textoinvalido="Informe o bairro"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="cep" tipo="text"
                name="endereco.cep" value={objeto.endereco.cep}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="cep OK" textoinvalido="Informe o cep"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="cidade" tipo="text"
                name="endereco.cidade" value={objeto.endereco.cidade}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="cidade OK" textoinvalido="Informe o cidade"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="uf" tipo="text"
                name="endereco.uf" value={objeto.endereco.uf}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="uf OK" textoinvalido="Informe o uf"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="numero" tipo="text"
                name="endereco.numero" value={objeto.endereco.numero}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="numero OK" textoinvalido="Informe o numero"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="complemento" tipo="text"
                name="endereco.complemento" value={objeto.endereco.complemento}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="complemento OK" textoinvalido="Informe o complemento"
                maximocaracteres={40} />
        </Dialogo>
    )
}

export default Form;
