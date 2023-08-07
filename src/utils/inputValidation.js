import debounce from "./debounce";

export const onChangeEmailValidation = (text, setText, setValidation) => {
    setText((prev) => {
        return {
            email: text,
            password: prev.password,
        };
    });
    emailValidation(text, setValidation);
};
const emailValidation = debounce((text, setValidation) => {
    const isPassed = text.includes("@");
    if (isPassed) {
        setValidation((prev) => {
            return {
                isEmailPassed: true,
                isPasswordPassed: prev.isPasswordPassed,
            };
        });
    } else {
        setValidation((prev) => {
            return {
                isEmailPassed: false,
                isPasswordPassed: prev.isPasswordPassed,
            };
        });
    }
}, 500);

export const onChangePasswordValidation = (text, setText, setValidation) => {
    setText((prev) => {
        return {
            email: prev.email,
            password: text,
        };
    });
    passwordValidation(text, setValidation);
};
const passwordValidation = debounce((text, setValidation) => {
    const isPassed = text.length >= 8;
    if (isPassed) {
        setValidation((prev) => {
            return {
                isEmailPassed: prev.isEmailPassed,
                isPasswordPassed: true,
            };
        });
    } else {
        setValidation((prev) => {
            return {
                isEmailPassed: prev.isEmailPassed,
                isPasswordPassed: false,
            };
        });
    }
}, 500);
