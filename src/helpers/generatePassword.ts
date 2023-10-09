import bcryptjs from 'bcryptjs';

const generatePassword = async (email: any) => {
  try {
    const password = email.split('@')[0];
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export default generatePassword;
