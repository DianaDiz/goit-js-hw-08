import throttle from "lodash.throttle";
const formRef = document.querySelector('.feedback-form');
// console.log(formRef);

const LOCALE_STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateMessageOutput();

function onFormInput(evt) {
    // const saveData = localStorage.getItem(LOCALE_STORAGE_KEY);
    try {
        let saveData = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (saveData) {
            saveData = JSON.parse(saveData);
        } else {
            saveData = {};
        }
        saveData[evt.target.name] = evt.target.value;
        const stringifyData = JSON.stringify(saveData);
        localStorage.setItem(LOCALE_STORAGE_KEY, stringifyData);
    } catch (error) {
        console.log(error);
    } 
    
};

const throttledOnFormInput = throttle(onFormInput, 500);

formRef.addEventListener('input', throttledOnFormInput);

function populateMessageOutput() {
    const saveData = localStorage.getItem(LOCALE_STORAGE_KEY);
    // console.log(saveData);
    if (!saveData) { 
        return;
    }
        try {
            const parseData = JSON.parse(saveData);
            // console.log(parseData);
            Object.entries(parseData).forEach(([name, value]) => {
                formRef.elements[name].value = value;
            });
        } catch (error) {
            console.log(error);
        }
    
}

const onFormSubmit = evt => {
    evt.preventDefault();
    const {
        elements: { email, message },
    } = evt.currentTarget;
    // console.log(email.value);
    // console.log(message.value);
    console.log({ email: email.value, message: message.value });
    evt.currentTarget.reset();
    localStorage.removeItem(LOCALE_STORAGE_KEY);
}

formRef.addEventListener('submit', onFormSubmit);