/** Dependencies */
import bcrypt from 'bcryptjs';

/** Encrypt password function */
export async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
/** Validate Hash function */
export async function validateHash(password, currentHash) {
  return await bcrypt.compare(password, currentHash);
}
