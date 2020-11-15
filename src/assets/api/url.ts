const DEV_URL = {//自己联调:npm run dev
    // dip: 'http://127.0.0.1:9001',
    // dip: 'http://127.0.0.1:8901',
    dip: 'http://localhost:8901',
    wis: 'http://127.0.0.1:8082'
};
const PRO_URL = {// 阿里云、线上环境打包：npm run build
    dip: 'http://127.0.0.1:8082',
    wis: 'http://127.0.0.1:8082'
};

export default process.env.NODE_ENV === 'development' ? DEV_URL : PRO_URL
