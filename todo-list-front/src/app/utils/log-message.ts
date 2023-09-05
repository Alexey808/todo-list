export function logMessage(
  text: string | number,
  additionalText: string = '',
  additionalValue: any = ''
): void {
  console.log(`%c[${text}: ${additionalText}]`, 'color: #2196F3;');

  if (additionalValue) {
    console.log('logMessage: ', additionalValue);
  }
}
