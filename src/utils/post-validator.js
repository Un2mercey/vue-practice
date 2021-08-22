export const validatePost = (value) => {
    return value !== undefined
        && Object.values(value)
            .map(Boolean)
            .filter(Boolean)
            .length === Object.values(value).length;
};
