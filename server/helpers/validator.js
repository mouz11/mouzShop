const Validator = require('validatorjs')
const User = require('../models/User')

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

Validator.register('strict', value => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');
Validator.registerAsync('exist', function (value, attribute, req, passes){
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr;
    let msg = (column === "username") ? `${column} has already been taken `: `${column} already in use`
    if(table === "User"){
            User.exists({[column] : value}).then(result=>{
                if (result){
                    passes(false, msg)
                    return
                }
                passes()
            })
    }

})
const validator = async (body, rules, customerMessage, cb)=>{
    const validation = new Validator(body, rules, customerMessage);
    validation.passes(()=>cb(null, true))
    validation.fails(()=>cb(validation.errors, false))
}

module.exports = validator;
