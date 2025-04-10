// components/CookieConsentBanner.tsx
import { useEffect, useState } from "react";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = async () => {
    try {
      const response = await fetch(
        "https://intex2025backend-fsh2fcgnacaycebx.eastus-01.azurewebsites.net/api/Movie/ConsentToCookies",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        // 👇 Alternate method to finalize the consent
        await fetch("https://intex2025backend-fsh2fcgnacaycebx.eastus-01.azurewebsites.net/trigger-consent", {
          method: "GET",
          credentials: "include",
        });

        localStorage.setItem("cookieConsent", "true");
        setShowBanner(false);
        console.log("Consent success:", data);
      } else {
        console.error("Consent failed:", data);
      }
    } catch (error) {
      console.error("Network error during consent:", error);
    }
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "72px",
        left: 0,
        right: 0,
        backgroundColor: "#1f2937",
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 9999,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <span>This site uses cookies for login. Accept to continue.</span>
      <button
        onClick={handleAccept}
        style={{
          marginLeft: "1rem",
          backgroundColor: "#3b82f6",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
      >
        Accept Cookies
      </button>
    </div>
  );
};

export default CookieConsentBanner;
