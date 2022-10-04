import React from 'react'

export const FormControlInput = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div>
            <input {...props} {...input} />
            {hasError && <span>{meta.error}</span>}
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