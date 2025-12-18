import { useEffect } from "react";

export function ErrorToast({ message, onClose }) {
  // AUTO-DISMISS LOGIC
  useEffect(() => {
    // Start a timer when the component mounts
    const timer = setTimeout(() => {
      onClose(); // Call the function passed from parent to close this
    }, 4000); // 4 seconds

    // Cleanup: If user closes it manually, stop the timer so it doesn't error
    return () => clearTimeout(timer);
  }, [onClose]);

  // If no message, don't render anything
  if (!message) return null;

  return (
    <div className="error-toast">
      <span className="error-icon">⚠️</span>
      <p>{message}</p>

      <button className="btn-close-toast" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default ErrorToast;
