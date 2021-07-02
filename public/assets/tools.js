// export default {
    Object.keys(v).forEach(i => {
        if(typeof v[i] === 'object') {
            Object.keys(v[i]).forEach(b => {
                if(typeof v[i][b] === 'object') {
                    Object.keys(v[i][b]).forEach(c => {
                        this.data[i][b][c] = v[i][b][c]
                    })
                } else {
                    this.data[i][b] = v[i][b]
                }
            })
        } else {
            this.data[i] = v[i]
        }
    })
// }



// DROPs
// {
//     id: 7749291930,
//         title: 'Ivanov Ivan',
//     info: {
//     phone: '+7900895859',
//         email: 'vankob49@gmail.com',
//         contacts: 'Telegram: @inban&@',
//         proxy: '127.0.0.1:8000',
//         wallets: 'paypal',
//         geo: {
//         latitude: 54.731781,
//             longitude: 36.413341
//     }
// },
// },
// {
//     id: 284938142,
//         title: 'Sergeev Sergey',
//     info: {
//     phone: '+7965895859',
//         email: 'ebanko@gmail.com',
//         contacts: 'Jabber: @jaba,  \nTelegram: @inban&@ \nTelegram: @12321&@',
//         proxy: '127.127.0.1:8000',
//         wallets: 'qiwi',
//         geo: {
//         latitude: 34.731781,
//             longitude: 56.413341
//     }
// },
// }


// Affilates
// {
//     dropId: 7749291930,
//         id: 895032182,
//     title: 'Moneta',
//     login: 'test1@mail.ru',
//     pass: 'Jjmd,,~Kl3',
//     wallet: 'WebMoney: Z0974903920',
//     link: 'https://dastepro.site/Jdlmm23',
//     workerId: 83423543,
//     jokerSetting: {country: 'de,gb,bg,ru'},
// },{
//     dropId: 284938142,
//         id: 895372882,
//         title: 'Advidi',
//         login: 'test3@mail.ru',
//         pass: 'Pkmdn783',
//         wallet: 'BTV: 1L8848Hkmnmfk940KKdl',
//         link: 'https://dastepro.site/Jdlmm23',
//         workerId: 100000000,
//         jokerSetting: {country: 'us,ca,ro,kz'},
// }






// Workers
// {
//     id: 100000000,
//         title: 'ADMIN',
//     login: 'ADMIN',
//     pass: 'ADMIN',
//     setting: {
//     proxyServices: {
//         Smartproxy: {
//             login: 'Maks89tinabris',
//                 pass: '89tinabris',
//                 savingMode: true,
//         },
//         ProxyCheap: {
//             login: 'login',
//                 pass: 'pass',
//                 ipv4: 'proxy.proxy-cheap.com',
//                 port: '10000'
//         }
//     }
// }
// },
// {
//     id: 83473292343,
//         title: 'Pavel',
//     login: 'Pashka8874@sharah71.bot',
//     pass: 'HHfiOokd123',
//     setting: {
//     proxyServices: {
//         Smartproxy: {
//             login: 'Maks89tinabris',
//                 pass: '89tinabris',
//                 savingMode: true,
//         },
//         ProxyCheap: {
//             login: 'login',
//                 pass: 'pass',
//                 ipv4: 'proxy.proxy-cheap.com',
//                 port: '10000'
//         }
//     }
// }
// },
// {
//     id: 83423543,
//         title: 'Vlad ',
//     login: 'bibo8874@sharah71.bot',
//     pass: 'sdgfgdd2343',
//     setting: {
//     proxyServices: {
//         Smartproxy: {
//             login: 'ArtyToe',
//                 pass: 'Sadjaabris',
//                 savingMode: false,
//         },
//         ProxyCheap: {
//             login: 'login',
//                 pass: 'pass',
//                 ipv4: 'proxy.proxy-cheap.com',
//                 port: '10000'
//         }
//     }
// }
// }
//








// Income

// {
//     id: 1621529581061,
//         amount: 234,
//     description: 'Выплата',
//     type: 'C 20 мая 2021 г. по 20 мая 2021 г.',
//     title: 'Moneta',
//     titleId: 895032182,
//     workerId: 83423543
// },{
//     id: 1621529581061,
//         amount: 234,
//         description: 'Выплата',
//         type: 'C 20 мая 2021 г. по 20 мая 2021 г.',
//         title: 'Moneta',
//         titleId: 895032182,
//         workerId: 83423543
// }





// Outcome

// {
//     id: 1621529591061,
//         amount: -234,
//     description: '100шт',
//     type: 'Почты',
//     title: 'Vlad',
//     titleId: 83423543,
// },{
//     id: 1621321591061,
//         amount: -2324,
//         description: '20шт',
//         type: 'Почты',
//         title: 'Pavel',
//         titleId: 83473292343,
// },{
//     id: 1621529647291,
//         amount: -1354,
//         description: '100шт',
//         type: 'Почты',
//         title: 'Pavel',
//         titleId: 83473292343,
// },{
//     id: 162132432061,
//         amount: -500,
//         description: '200шт',
//         type: 'Почты',
//         title: 'Vlad',
//         titleId: 83423543,
// },
