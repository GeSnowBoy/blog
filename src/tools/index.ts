export function parseQueryString(url: string): { [key: string]: string } {
  var obj = {};
  if (url.indexOf('?') == -1) return obj;
  url
    .substring(url.indexOf('?') + 1)
    .split('&')
    .map(item => {
      let index = item.indexOf('=');
      if (index !== -1) {
        obj[item.substr(0, index)] = item.substr(index + 1);
      } else {
        obj[item] = undefined;
      }
    });
  return obj;
}
