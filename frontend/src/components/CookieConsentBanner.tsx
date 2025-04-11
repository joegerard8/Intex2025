// components/CookieConsentBanner.tsx

import { useEffect, useState } from "react";

/**
 * A banner component that appears when a user hasn't yet consented to cookies.
 * It persists consent in localStorage and optionally calls backend APIs to register consent.
 */
const CookieConsentBanner = () => {
  // Tracks whether the banner should be shown
  const [showBanner, setShowBanner] = useState(false);

  // On component mount, check localStorage for existing cookie consent
  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  /**
   * Handles the user's acceptance of cookie usage.
   * Sends a POST request to the backend to register consent,
   * optionally triggers additional server actions, and saves consent locally.
   */
  const handleAccept = async () => {
    try {
      const response = await fetch(
        "https://intex2025backend-fsh2fcgnacaycebx.eastus-01.azurewebsites.net/api/Movie/ConsentToCookies",
        {
          method: "POST",
          credentials: "include", // Includes cookies in the request
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Optional trigger for additional consent processing on the backend
        await fetch(
          "https://intex2025backend-fsh2fcgnacaycebx.eastus-01.azurewebsites.net/trigger-consent",
          {
            method: "GET",
            credentials: "include",
          }
        );

        // Store consent in localStorage to prevent showing the banner again
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

  // If consent has already been given, don't render the banner
  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "72px", // Adjust based on header height if needed
        left: 0,
        right: 0,
        backgroundColor: "#1f2937", // Tailwind gray-800 equivalent
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 9999, // Ensures banner is above all other elements
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)", // Subtle drop shadow
      }}
    >
      <span>This site uses cookies for login. Accept to continue.</span>
      <button
        onClick={handleAccept}
        style={{
          marginLeft: "1rem",
          backgroundColor: "#3b82f6", // Tailwind blue-500
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#ffffff")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "#6b7280") // Tailwind gray-500
        }
      >
        Accept Cookies
      </button>
    </div>
  );
};

export default CookieConsentBanner;
