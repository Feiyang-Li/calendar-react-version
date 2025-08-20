export function waitForAnimations(el, fallbackMs = 300) {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if(done) return;
      done = true;
      el.removeEventListener("animationend", finish);
      el.removeEventListener("transitionend", finish);
      resolve();
    }
    el.addEventListener("animationend", finish, {once: true});
    el.addEventListener("transitionend", finish, {once: true});
    setTimeout(finish, fallbackMs);
  })
}