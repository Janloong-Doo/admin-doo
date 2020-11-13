const DEV_URL = {
    dip: 'http://192.168.211.1:9001',
    wis: 'http://192.168.211.1:9001'
};
const PRO_URL = {
    dip: 'http://192.168.211.1:9001',
    wis: 'http://192.168.211.1:9001'
};

export default process.env.NODE_ENV === 'development' ? DEV_URL : PRO_URL
