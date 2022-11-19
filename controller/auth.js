const bcrypt = require('bcrypt');
const user = require('../model/userModel');
const local_strategy = require('passport-local');

const auth = (passport, username) => {
    async function verify(username, password, done) {

        try{
        const userAccount = await user.findOne({ username });
        const isValid = await bcrypt.compare(password, userAccount.password)
        
        console.log(isValid);
        
        if(!userAccount){return done(null,false)}
        if(isValid){return done(null, userAccount)}
        else{return done(null, false)}
        }
        catch(err){
            console.log(err)
        }

        
    }
    const strat = new local_strategy(verify);
    passport.use(strat);

    passport.serializeUser((user,done)=>{
        done(null, user.id);
    })

    passport.deserializeUser((userId, done)=>{
        user.findById(userId)
            .then((user)=>{
                done(null,user);
            })
            .catch(err => done(err));
    })
    
}

module.exports = auth;
