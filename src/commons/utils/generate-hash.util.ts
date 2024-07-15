import * as bcrypt from 'bcrypt';

export async function generateHash(password: string): Promise<string> {
  return await bcrypt.hash(password, 8);
}
