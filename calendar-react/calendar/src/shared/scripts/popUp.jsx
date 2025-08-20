import {useState, useRef} from "react"

// tbd not finished.


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

export default function PopUp({children, className="", timeFrame}) {
    // fast pop up
    const ref = useRef(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!el.open) el.showModal();
        if (el.open && !isClosing) el.close();
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
    }, [onClose]);

    const handleBackdropClick = useCallback(
        (e) => {
        // "click outside to close"
        if (e.target === ref.current) close();
        },
        [close]
    );

}