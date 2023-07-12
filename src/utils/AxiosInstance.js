const { default: axios } = require("axios");

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL
  });

  // axiosInstance.interceptors.request.use(config => {
  //   // Agregar los encabezados CORS a cada solicitud
  //   config.headers['Access-Control-Allow-Origin'] = '*';
  //   config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
  //   config.headers['Access-Control-Allow-Headers'] = '*';
  //   return config;
  // });



  export default axiosInstance;