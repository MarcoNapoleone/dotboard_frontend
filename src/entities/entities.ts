
export type Role = 'BASIC' | 'ADMIN';
export type Status = 'ACTIVE' | 'INACTIVE' | 'DISABLED';
export type Id = number | string;
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;

export const checkUUID = (uuid: UUID | Id) => {
  if (typeof uuid !== 'string') return false
  const regexUUID = /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}/g
  return regexUUID.test(uuid)
}
