export function idGen(): string {
  return `t-${Math.round(Math.random() * (99999 - 10000) + 10000)}`;
}
