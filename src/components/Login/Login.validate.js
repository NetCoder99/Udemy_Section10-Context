// ------------------------------------------------------------------
function emailReducerFnc(state = [], action) {
    switch (action.type) {
        case 'USER_INPUT':
            console.log('Login.validate:emailReducerFnc:USER_INPUT');
            return { value: action.val, isValid: action.val.includes('@') }
        case 'INPUT_BLUR':
            console.log('Login.validate:emailReducerFnc:INPUT_BLUR');
            return { value: state.value, isValid: state.value.includes('@') }
        default:
            console.log('Login.validate:emailReducerFnc:INIT_STATE');
            return { value: '', isValid: false }
    }
};
export { emailReducerFnc };

// ------------------------------------------------------------------
function passwordReducerFnc(state = [], action) {
    if (action.type === 'USER_INPUT') {
        console.log('Login.validate:passwordReducerFnc:USER_INPUT');
        return { value: action.val, isValid: action.val.trim().length > 6 }
    }
    if (action.type === 'INPUT_BLUR') {
        console.log('Login.validate:passwordReducerFnc:INPUT_BLUR');
        return { value: state.value, isValid: state.value.trim().length > 6 }
    }
    console.log('Login.validate:passwordReducerFnc:INIT_STATE');
    return { value: '', isValid: false }
};
export { passwordReducerFnc };

