function CampoSelect(props) {

    return (
        <div className="form-group">
            <label htmlFor={props.id} className="form-label">
                {props.label}
            </label>
            <select
                className="form-control"
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.handlechange}
                required={props.requerido}
            >
                <option disable="true" value="">{props.textoinvalido}</option>
                {props.children}
            </select>
            <div className="valid-feedback">
                {props.textovalido}
            </div>
            <div className="invalid-feedback">
                {props.textoinvalido}
            </div>
        </div>
    )

}

export default CampoSelect;