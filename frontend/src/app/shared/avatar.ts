/** Initials shown in the avatar tile, e.g. "AO" for Amara Okafor. */
export function initials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

/** Same department always gets the same tile colour (tone-0 … tone-5, see styles.css). */
export function toneClass(department: string): string {
  let hash = 0;
  for (const ch of department.toLowerCase()) {
    hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  }
  return `tone-${hash % 6}`;
}
