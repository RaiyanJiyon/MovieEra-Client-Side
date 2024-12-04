export const validateURL = (url) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
};

export const validateNotEmpty = (value) => {
    return value.trim() !== '';
};

export const validateMinLength = (value, length) => {
    return value.trim().length >= length;
};

export const validateGreaterThan = (value, number) => {
    return parseInt(value) > number;
};
