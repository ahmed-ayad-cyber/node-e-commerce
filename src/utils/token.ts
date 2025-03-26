import Jwt from "jsonwebtoken";

class CreateTokens {
    accessToken = (id: any, role: string) =>Jwt.sign({_id: id, role}, process.env.JWT_KEY!,{expiresIn:"1d"});
    resetToken  = (id: any) => Jwt.sign({_id: id}, process.env.JWT_KEY_RESET!,{expiresIn:"10m"});
}

const createTokens = new CreateTokens();
export default createTokens;


 