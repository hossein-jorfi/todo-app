import { hash, compare } from "bcryptjs";

async function hashPassword(password) {
     const hashedPassword = await hash(password, 1);
     return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
     const isValid = await compare(password, hashedPassword);
     return isValid;
}

export { hashPassword, verifyPassword };