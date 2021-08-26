// eslint-disable-next-line import/prefer-default-export
export function openChat() {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:show']);
    window.$crisp.push(['do', 'chat:open']);
  }
  return false;
}
