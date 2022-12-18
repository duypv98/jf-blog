import { compare, genSalt, hash } from 'bcryptjs';

const saltRounds = process.env.SALT_ROUNDS;

/**
 *
 * @param {string} plain
 * @returns
 */
export async function hashPassword(plain) {
  const salt = await genSalt(Number(saltRounds));
  return hash(plain, salt);
}

/**
 *
 * @param {string} plain
 * @param {string} hash
 * @returns
 */
export function compareHashPassword(plain, hash) {
  return compare(plain, hash);
}