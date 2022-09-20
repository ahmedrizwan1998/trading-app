import axios from 'axios';

const TOKEN = "cck43t2ad3i2ngrq40hgcck43t2ad3i2ngrq40i0";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})
