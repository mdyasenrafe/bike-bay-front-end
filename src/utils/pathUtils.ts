export const doesPathMatch = (
  pathPattern: string,
  pathname: string
): boolean => {
  const regexPattern = new RegExp(
    `^${pathPattern.replace(/:\w+/g, "\\w+").replace(/\//g, "\\/")}\/?$`
  );
  return regexPattern.test(pathname);
};
