export function ensureValueIsNotNullOrUndefined<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }
  return argument;
}
export function safelyJsonParse<T>(stringToBeParsed: T): unknown {
  if (typeof stringToBeParsed === "string") {
    return JSON.parse(stringToBeParsed);
  }
  const message: string = `This value is supposed to be a type of string, instead found${typeof stringToBeParsed}`;
  throw new TypeError(message);
}
export function ensureValueIsnotString<T>(
  argument: T | string,
  message: string = "This value is supposed to be an Array of objects"
): T {
  if (typeof argument === "string") {
    throw new TypeError(message);
  }
  return argument;
}
