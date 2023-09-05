export function idGen(): string {
  return `t-${Math.floor(Math.random() * new Date().getTime())}`;
}
