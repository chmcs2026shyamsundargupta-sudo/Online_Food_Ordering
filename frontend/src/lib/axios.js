import axios from "axios";
const api = axios.create({
    baseURL: "https://online-food-ordering-xh3v.onrender.com/orders",
})
export default api
