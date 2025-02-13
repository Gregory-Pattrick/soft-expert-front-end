import styles from './Input.module.css'

function Input({ type, text, name, placeholder, handleOnChange, value, required, min, max, step}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} 
                name={name}
                id={name} 
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                required={required}
                min={min}
                max={max}
                step={step}
                />
        </div>
    )
}

export default Input