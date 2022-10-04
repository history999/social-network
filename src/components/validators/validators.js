export const required = value => (value || typeof value === 'number' ? undefined : 'Please type some text');
export const lengthRequired = (maxLength) => (value) => {
        if (value && value.length > maxLength) return 'Please, no more than 20 characters';

        return undefined
    }
