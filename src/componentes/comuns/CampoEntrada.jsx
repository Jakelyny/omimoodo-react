function CampoEntrada({id , label, tipo , name, value, handlechange,
    requerido, readonly, textovalido, textoinvalido, maximocaracteres}) {

    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type={tipo}
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={handlechange}
                required={requerido}
                readOnly={readonly}
                maxLength={maximocaracteres}
            />
            <div className="valid-feedback">
                {textovalido}
            </div>
            <div className="invalid-feedback">
                {textoinvalido}
            </div>
        </div>
    )

}

export default CampoEntrada;