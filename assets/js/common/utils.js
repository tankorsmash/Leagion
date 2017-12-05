export function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export function buildPageTitle(prefix) {
    let title = `${prefix} | Leagion`;
    document.title = title;
}

export function uuid4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const keyCodes = {
  esc:   27,
  space: 32,
  tab:   9,
  up:    38,
  down:  40,
};
