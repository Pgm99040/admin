const config = {
    production: {
        APP_API: "https://api.codediy.io/",
    },
    staging: {
        APP_API: "https://api-stg.codediy.io/",
    },
    development: {
        APP_API: "http://localhost:8080/",
    },
};
const API_CONFIG =  config[process.env.REACT_APP_ENV || "staging"];

const utils = {
    hostURL: url => `${API_CONFIG.APP_API}${url}`,
};
export default utils
