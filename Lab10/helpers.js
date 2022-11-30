//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const createValidator = async (username, password) => {

    if (!username || !password) throw {statusCode: 400, error: "Username or Password cannot be empty"};

    // Username Validations
    if (typeof username !== "string") throw {statusCode: 400, error: "Username should be a valid string"};
    if (username.trim().length === 0) throw {statusCode: 400, error: "Username cannot be just empty spaces"};
    let checkSpaces = username.split(" ");
    if (checkSpaces.length > 1) throw {statusCode: 400, error: "No spaces in the username is allowed"};
    if (/^[0-9a-zA-Z]+$/ .test(username) === false) throw  {statusCode: 400, error: "Username can be only alphanumeric characters"};
    if (username.length < 4) throw {statusCode: 400, error: "Username should be at least 4 characters long"};

    // Password Validations
    if (typeof password !== "string") throw {statusCode: 400, error: "Password should be a valid string"};
    checkSpaces = password.split(" ");
    if (checkSpaces.length > 1) throw {statusCode: 400, error: "No spaces in the password is allowed"};
    if (/(?=.*\d)(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/.test(password) === false) throw {statusCode: 400, error: "Password should have at least one uppercase character & there has to be at least one number & there has to be at least one special character"};
    if (password.length < 6) throw {statusCode: 400, error: "Password should be at least 6 characters long"};
};
     

module.exports = {
    createValidator
  };