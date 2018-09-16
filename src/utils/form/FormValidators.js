const FormValidators = {
    notEmpty:
        (text, placeholder) => {
            if (!text && !text.length) return `Поле "${placeholder}" обязательно`;
            else return '';
        },
    auth:
        () => {

        }
};

export { FormValidators };
