// Dialog.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function waitForAnimations(el, fallbackMs = 300) {
  // Resolve after the first animationend/transitionend, or fallback.
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.removeEventListener("animationend", finish);
      el.removeEventListener("transitionend", finish); 
      resolve();
    };
    el.addEventListener("animationend", finish, { once: true });
    el.addEventListener("transitionend", finish, { once: true });
    setTimeout(finish, fallbackMs); // if no animations defined
  });
}

export default function Dialog({ open, onClose, children, className = "" }) {
  const ref = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open && !isClosing) el.close();
  }, [open, isClosing]);

  const close = useCallback(async () => {
    const el = ref.current;
    if (!el) return;

    setIsClosing(true);
    el.classList.add("dialog--closing");

    await waitForAnimations(el).catch(() => {}); // keep UX resilient

    el.classList.remove("dialog--closing");
    setIsClosing(false);
    el.close();
    onClose?.(); // lift state to parent after animation completes
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e) => {
      // "click outside to close"
      if (e.target === ref.current) close();
    },
    [close]
  );

  // If child is a function -> render-prop: we inject `close`
  const content = useMemo(() => {
    if (typeof children === "function") return children({ close, isClosing });
    return children;
  }, [children, close, isClosing]);

  return (
    <dialog
      ref={ref}
      className={className}
      onClick={handleBackdropClick}
      data-dialog="generic"
    >
      {content}
    </dialog>
  );
}
