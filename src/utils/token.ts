import Jwt from "jsonwebtoken";

class CreateTokens {
    accessToken = (id: any, role: string) =>
        Jwt.sign({_id: id, role}, process.env.JWT_KEY!,{ expiresIn: `1d` });
}

const createTokens = new CreateTokens();
export default createTokens;


