export const validateURL = (url) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
};

export const validateNotEmpty = (value) => {
    if (Array.isArray(value)) {
        return value.length > 0; // For arrays, check if it has elements
    }
    return typeof value === 'string' && value.trim().length > 0; // For strings, check if it's non-empty
};

export const validateMinLength = (value, length) => {
    return value.trim().length >= length;
};

export const validateGreaterThan = (value, number) => {
    return parseInt(value) > number;
};
