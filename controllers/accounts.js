const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

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
router.post('/sayHello', async(req,res)=>{

    const {token} = req.body;
    const data = await jsonwebtoken.verify(token, 'KLhE49HZA661xvtw9BoUr9QbnOKLJiL6');
    return res.status(200).json({
        message: data
    });
})
//console
//const newper = {user...}
//arr.push(newper)
//console
// router.post('/login', async(req,res) => {
//     const {email,password} = req.body;

//     const hash_password = await bcryptjs.hash(password,10);

//     const isMatch = await bcryptjs.compare(password,hash_password);

//     const data = {
//         id: 123456,
//         firstName: 'Elihu',
//         lastName: 'Chitrit',
//         email: 'elihuc@elihuc.com',
//         position: 'CTO'
//     }

//     const token = await jsonwebtoken.sign(data, 'KLhE49HZA661xvtw9BoUr9QbnOKLJiL6');

//     if(isMatch){
//         return res.status(200).json({
//             token : token,
//             hash_password: hash_password
//         });
//     } else {
//         return res.status(200).json({
//             message : 'FALSE'
//         });
//     }



// })

let users = [];
router.post('/signup', async(request,response) => {
    const {email,password} = request.body;
    try {
        if(!email || !password){
            return response.status(200).json({message: 'Please fill inputs'});
        } else{
            const account = await users.find(x => x.email == email);
            if(account){
                return response.status(200).json({message: 'User exist'});
            } else {
                const hash = await bcryptjs.hash(password, 10);
                const _user = {
                    email: email,
                    password: hash
                }
                users.push(_user);
                return response.status(200).json({message: _user});
            }
        }
    } catch (error) {
        return response.status(500).json({message: error});
    }
})

router.post('/signin', async(request,response) => {
    const {email,password} = request.body;
    try {
        if(!email || !password){
            return response.status(200).json({message: 'Please fill inputs'});
        } else{
            const account = await users.find(x => x.email == email);
            if(account){
                const isMatch = await bcryptjs.compare(password, account.password);
                if(isMatch){
                    const token = await jsonwebtoken.sign(account, 'KLhE49HZA661xvtw9BoUr9QbnOKLJiL6');
                    return response.status(200).json({message: token});
                } else {
                    return response.status(200).json({message: 'Password not match'});
                }
            } else {
                return response.status(200).json({message: 'Account not exist'});
            }
        }
    } catch (error) {
        return response.status(500).json({message: error});
    }
})








module.exports = router;