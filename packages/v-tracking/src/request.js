import axios from "axios";
export default (baseUrl, params) => {
    axios({
        url: baseUrl,
        method: "post",
        data: params,
    });
};