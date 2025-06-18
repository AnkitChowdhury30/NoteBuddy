import ratelimit from "../cofig/upstash.js";
const rateLimiter = async (req,res,next)=>{

  try {
    const {success} = await ratelimit.limit("my-limit-key");
    if(!success){
      return res.status(429).json({
        message:"Too many requests, please try again later"
      })
    }
  } catch (error) {
    console.log("error in rate limiting",error);
  }

  next();
}
export default rateLimiter;