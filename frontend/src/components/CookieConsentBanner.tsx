import { useEffect, useState } from "react";

const COOKIE_KEY = "cookie_consent";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "granted");
    fetch("https://localhost:5000/ConsentGranted", {
      method: "POST",
      credentials: "include",
    });
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <p>
          We use cookies to improve your experience. By continuing, you agree to
          our cookie policy.
        </p>
        <div className="flex gap-2 ml-4">
          <button
            onClick={handleAccept}
            className="bg-green-600 px-3 py-1 rounded"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
