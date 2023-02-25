export const required = value => (value || typeof value === 'number' ? undefined : 'Required');
export const lengthRequired = (maxLength) => (value) => {
        if (value && value.length > maxLength) return 'Please, no more than 20 characters';

        return undefined
    }

   export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined