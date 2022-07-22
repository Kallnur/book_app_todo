import { inputHideWarn, inputShowWarn } from "../util";

export const validatePassword = (str) => {
    if (str.length < 4) {
        return [false, 'Пароль должен содержать минимум 4 символов'];
    }
    
    // if (str.search(/[a-z]/) === -1) {
    //     return [false, 'Пароль должен содержать символ в нижнем регистре'];
    // }

    // if (str.search(/[A-Z]/) === -1) {
    //     return [false, 'Пароль должен содержать символ в верхнем регистре'];
    // }

    // if (str.search(/[0123456789]/) === -1) {
    //     return [false, 'Пароль должен содержать цифры'];
    // }

    // if (str.search(/[!@#$%^&*()\-=_+~[\]{}'"\\|,./<>?]/) !== -1) {
    //     return [false, 'Пароль не может содержать спецсимволы'];
    // }

    if (str.search(/\s/) !== -1) {
        return [false, 'Пароль не может содержать пробелы'];
    }

    return [true];
}

export const validateName = (str) => {
    if (str.length < 2) {
        return [false, 'В имени должно быть минимум 2 символа'];
    }

    if (str.search(/[0123456789]/) === 1) {
        return [false, 'В имены не должно быть цифр'];
    }

    if (str.search(/[!@#$%^&*()\-=_+~[\]{}'"\\|,./<>?]/) === 1) {
        return [false, 'В имены не должно быть спецсимволов'];
    }

    if (str.search(/\s/) !== -1) {
        return [false, 'Имя не может содержать пробелы'];
    }

    return [true];
}

export const signValidate = (tagUserName, tagUserPassword, tagRepassword) => {
    const [validName, nameError] = validateName(tagUserName.value);
    const [validPassword, passwordError] = validatePassword(tagUserPassword.value);

    const nameMessSpan = tagUserName.closest('div').querySelector('span');
    const passwordMessSpan = tagUserPassword.closest('div').querySelector('span');

    let repasswordMessSpan;
    let repasswordBool = false;

    if(tagRepassword) repasswordMessSpan = tagRepassword.closest('div').querySelector('span');

    if(!validName) {
        inputShowWarn(tagUserName, nameMessSpan, nameError)
    }
    if(!validPassword) {
        inputShowWarn(tagUserPassword, passwordMessSpan, passwordError)
    }

    if(validName) {
        inputHideWarn(tagUserName, nameMessSpan)
    }
    if(validPassword) {
        inputHideWarn(tagUserPassword, passwordMessSpan)
    }

    if(tagRepassword){
        if(tagRepassword.value !== tagUserPassword.value){
            inputShowWarn(tagRepassword, repasswordMessSpan, 'Пароли не совпадают');
            repasswordBool = false;
    
        } else {
            inputHideWarn(tagRepassword, repasswordMessSpan)
            repasswordBool = true;
        }
    }

    if(tagRepassword){
        if(validName && validPassword && repasswordBool) return true;
    }

    if(validName && validPassword) return true;

    return false
}

export const validateNameAge = (tagAge, tagFirstName) => {
    const [validName, nameError] = validateName(tagFirstName.value);

    const messAgeSpan = tagAge.closest('div').querySelector('span');
    const messNameSpan = tagFirstName.closest('div').querySelector('span');

    // VAlID Age

    if(tagAge.value.length < 1) {
        console.log(tagAge.value.length);
        inputShowWarn(tagAge, messAgeSpan, 'Поле обязательно');
    }

    if(tagAge.value < 6) {
        inputShowWarn(tagAge, messAgeSpan, '+6');
    }

    if(tagAge.value > 130){
        inputShowWarn(tagAge, messAgeSpan, 'Сказочник');
    }

    if(tagAge.value < 130 && tagAge.value > 5) inputHideWarn(tagAge, messAgeSpan)

   
    // VALID NAme

    if(!validName) {
        inputShowWarn(tagFirstName, messNameSpan, nameError);
    }

    if(validName) {
        inputHideWarn(tagFirstName, messNameSpan)
    }

    if(validName && tagAge.value < 130 && tagAge.value > 5) {
        inputHideWarn(tagFirstName, messNameSpan)
        inputHideWarn(tagAge, messAgeSpan)
        return true
    }

    return false
}