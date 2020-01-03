import bcrypt from 'bcryptjs';

export async function encryptPassword (password){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export async function validateHash (password, currentHash){
    return await bcrypt.compare(password, currentHash );
};