export interface User {
  name: string;
  email: string;
  password?: string;
  registrationDate?: Date;
  refreshToken?: string;
  refreshTokenExpiration?: Date; 
}