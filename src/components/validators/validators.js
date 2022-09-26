export const required = value => (value || typeof value === 'number' ? undefined : 'Please type some text')
