function checkEnvVariables(){
    if (!process.env.CONFIG_SYNCH || 
        !process.env.CONFIG_POOL ||
        !process.env.OPERATOR_PORT_EXTERNAL ||
        !process.env.URL_SERVER_PROOF 
    ) {
        return true;
    }
    else return false;
}

module.exports = {
    checkEnvVariables,
};
