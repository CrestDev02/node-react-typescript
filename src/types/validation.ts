export default interface ValidationSchema {
    name: ValidationObject;
    email: ValidationObject;
    password: ValidationObject;
    confirm_password: ValidationObject;
    github_username: ValidationObject;
}

interface ValidationObject {
    isValid: boolean,
    message: string
}