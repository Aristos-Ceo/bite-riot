import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const key = new TextEncoder().encode(process.env.SESSION_SECRET || "development-secret-change-me-please-123456");
export async function createAdminSession(){const token=await new SignJWT({role:"admin"}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("8h").sign(key);(await cookies()).set("bite-riot-admin",token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:28800});}
export async function isAdmin(){try{const token=(await cookies()).get("bite-riot-admin")?.value;if(!token)return false;const {payload}=await jwtVerify(token,key);return payload.role==="admin";}catch{return false;}}
export async function clearAdminSession(){(await cookies()).delete("bite-riot-admin");}
