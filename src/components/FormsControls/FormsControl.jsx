import React from 'react'

export const FormControlInput = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    console.log(meta.error)
    return (
        <div>
            <input className='standart-input' {...props} {...input} />
            {meta.touched && ((meta.error && <p>{meta.error}</p>) || (meta.warning && <p>{meta.warning}</p>))}
        </div>
    )
}

export const FormControlCheckbox = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div>
            <input type={'checkbox'} {...props} {...input} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}