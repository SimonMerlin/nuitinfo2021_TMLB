import { GeneratedSecret } from "speakeasy";

export class User{
  username?: string;
  password?: string;
  secret?:GeneratedSecret;
}
