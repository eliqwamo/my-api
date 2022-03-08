const express = require('express');
const router = express.Router();

const arr = [
    {
        username: 'Bill Gates',
        password: '123456',
        email: 'billgates@microsoft.com'
    },
    {
        username: 'Steve Jobs',
        password: '123456',
        email: 'billgates@microsoft.com'
    },
];

//http://localhost:5090/api/accounts/sayHello
// router.get('/sayHello', (req,res)=>{
//     return res.status(200).json({
//         message: 'Say hello from API route'
//     });
// })

router.post('/sayHello', (req,res)=>{

    // const username = req.body.username;
    // const password = req.body.password;

    const {username,password} = req.body;

    return res.status(200).json({
        message: `Hello ${fname} from API route`
    });
})

module.exports = router;