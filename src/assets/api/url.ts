// interface ipconfig {
//     dip: string
//     wis: string
// };
const devUrl = {
    dip: 'http://localhost:8901',
    wis: 'http://127.0.0.1:8082'
}
const proUrl = {
    dip: 'http://127.0.0.1:8082',
    wis: 'http://127.0.0.1:8082'
}

// interface urlconfig {
//     devUrl: ipconfig
//     proUrl: ipconfig
// }

// declare const url: urlconfig;
// export default process.env.NODE_ENV === 'development' ? DEV_URL : PRO_URL
export default process.env.NODE_ENV === 'development' ? devUrl : proUrl
