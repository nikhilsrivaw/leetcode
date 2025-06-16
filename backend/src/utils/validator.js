const validator  = require('validator')

const validate = (data)=>{
    const mandatoryField = ['firstName' , 'emailId' , 'password']
    const IsAllowed = mandatoryField.every((k) => Object.keys(data).includes(k)) 

    if(!IsAllowed)
        throw new Error("Some field Missing");
    if(!validator.isEmail(data.emailId))
        throw new Error("Inavlid Email");
    // Check password strength
    const password = data.password;
    const isStrong = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    });

    if (!isStrong) {
        throw new Error("Weak password. Must include uppercase, lowercase, number, symbol and be 8+ characters");
    }


    

}

module.exports = validate