import { inputHideWarn, inputShowWarn } from "../util";

export const validateStr = (str) => {
    if (str.length < 2) {
        return [false, 'В поле должно быть минимум 2 символа'];
    }

    return [true];
}

export const validateAddBook = (formBody) => {
    const allInputs = formBody.querySelectorAll('input');

    let validBool = true;

    Array.from(allInputs).forEach(input => {
        const [valid, errMess] = validateStr(input.value);

        const messSpan = input.closest('div').querySelector('span');


        if( !valid ){
            inputShowWarn(input, messSpan, errMess);
            validBool = false;
        } 

        if( valid ){
            inputHideWarn(input, messSpan)
        }
    })

    return validBool;

}