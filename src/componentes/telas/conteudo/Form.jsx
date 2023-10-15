import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import MaliciousWebsiteContext from './ConteudoContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(MaliciousWebsiteContext);

    return (
        <Dialogo id="modalEdicao" titulo="MaliciousWebsite" idformulario="formEdicao"
        acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtNome" label="titulo" tipo="text"
                name="titulo" value={objeto.titulo}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="titulo OK" textoinvalido="Informe o titulo"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="texto" tipo="text"
                name="texto" value={objeto.texto}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="texto OK" textoinvalido="Informe a texto"
                maximocaracteres={2000} />
            <CampoEntrada id="txtNome" label="autor" tipo="text"
                name="autor" value={objeto.autor}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="autor OK" textoinvalido="Informe o autor"
                maximocaracteres={40} />
            <CampoEntrada id="txtNome" label="imagem" tipo="text"
                name="imagem" value={objeto.imagem}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="imagem OK" textoinvalido="Informe a imagem"
                maximocaracteres={80} />
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
        </Dialogo>
    )
}

export default Form;