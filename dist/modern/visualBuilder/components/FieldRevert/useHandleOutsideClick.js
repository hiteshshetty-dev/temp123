import "../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/FieldRevert/useHandleOutsideClick.ts
import { useEffect } from "preact/compat";
var useHandleOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
var useHandleOutsideClick_default = useHandleOutsideClick;
export {
  useHandleOutsideClick_default as default
};
//# sourceMappingURL=useHandleOutsideClick.js.map