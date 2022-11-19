const passport = require('passport');
const getAnime = require('./fetchApi');
const {getComments, getUserComments} = require('./populateCommentUser');
const {addToUserComments} = require('./postCommentUser');
const {createComment, createUser} = require('./createDoc');


//landing page. display top airing and top season anime
const animeHome = async (req, res) => {
    try {
        const animes = await getAnime('https://api.jikan.moe/v4/top/anime', {filter: 'bypopularity', page:1})
        const seasonAnime = await getAnime('https://api.jikan.moe/v4/seasons/now', {page:1})
        res.render('home', {animes, seasonAnime, logged:req.user});
        console.log(req.user);
    }catch(e){
        console.log(e.message);
    }
 
}

//get details of anime
const aniDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const ani_details = await getAnime(`https://api.jikan.moe/v4/anime/${id}`);
        const cast_details = await getAnime(`https://api.jikan.moe/v4/anime/${id}/characters`)
        const comments = await getComments(id)
        
        res.render('details', {ani_details, cast_details,comments});
    }catch(e){
        console.log(e.message);
    }
}

//get user profile
const userProfile = async (req, res)=> {
    try{
        const {id} = req.params;
        const profile = await getUserComments(id);
        res.render('profile', {logged:req.user, profile});
    }catch(e){
        console.log(e);
    }
}

//post comments to comments part
const postComment = async(req,res)=>{
    try{
        const {id} = req.params;
        const new_comment = await createComment(id, req.body.addComment, req.user.id);
        await addToUserComments(req.user._id, new_comment.id);

        res.redirect(`/details/${id}`);
    }catch(e){
        console.log(e);
    }
}

//search anime
const aniSearch =  async(req,res)=>{
 try{
        const ani_results = await getAnime(`https://api.jikan.moe/v4/anime`, {q: req.body.search})
        res.render('search', {ani_results, search:req.body.search});
     
    }catch(e){
        console.log(e.message);
    }
}


//add user
const signupPage = (req,res)=>{
    res.render('signup');
}

//login user
const signupPost = async (req, res)=>{
    try{
        await createUser(req.body.username,req.body.password);
        res.redirect('/login');

    }catch(e){
        console.log(e.message);
    }
}

//login page
const loginPage = (req,res)=>{
    res.render('loginPage');
}

// authenticate login credentials
const login = passport.authenticate('local', {successRedirect:'/', failureRedirect:'/signup'})

// logout user
const logout = (req,res)=>{
    req.logOut((err)=>{
        if(err){
            throw err
        }
        res.redirect('/');

    });
}

//export functions
module.exports = {
    animeHome,
    aniDetails,
    postComment,
    aniSearch,
    signupPage,
    signupPost,
    login,
    logout,
    loginPage,
    userProfile
}

