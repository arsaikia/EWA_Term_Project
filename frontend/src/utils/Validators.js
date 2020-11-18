const isPassword = (pass) => {
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    return regex.test(pass);
};

export { isPassword };
