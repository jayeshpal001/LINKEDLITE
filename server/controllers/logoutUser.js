

const logout = (req, res)=>{
    res.clearCookie('jwt', {
        httpOnly: true, 
        sameSite: 'strict', 
        secure: process.env.NODE_ENV === "production", 
    }); 
    res.status(200).json({message: "Logged  out Successfully"}); 
}

module.exports = logout; 
