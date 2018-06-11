
// if (process.env.NODE_ENV === 'production') {
//     caryHost = 'http://h5.pyge.top'
// } else if (process.env.NODE_ENV === 'development') {
//     caryHost = ''
// }
// export const caryHost =  'http://localhost:3000/'
export const caryHost = process.env.NODE_ENV === 'production' ?  'http://h5.zhizhelexue.com' : 'http://localhost:3000'
// export const caryHost = fcaryHost()

// var  fcaryHost = function () {
//     let host = ''
//     if (process.env.NODE_ENV === 'production') {
//         host = 'http://pygeh5.howgets.com:88/'
//     } else if (process.env.NODE_ENV === 'development') {
//         host = 'http://localhost:3000/'
//     }
//     return host;
// }


