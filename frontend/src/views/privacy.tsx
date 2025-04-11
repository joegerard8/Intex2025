import React, { useEffect } from "react";
import "./privacy.css";

const Privacy: React.FC = () => {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Adjust to match your scroll-margin-top
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      const links = document.querySelectorAll(".sidebar-nav a");
      links.forEach((link) => link.classList.remove("active"));
      e.currentTarget.classList.add("active");
    }
  };

useEffect(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll("h3[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionElement = section as HTMLElement;
      const sectionTop = sectionElement.offsetTop;
      const sectionHeight = sectionElement.offsetHeight;
      const sectionId = sectionElement.getAttribute("id") || "";

      const activeLink = document.querySelector(
        `.sidebar-nav a[href="#${sectionId}"]`
      );
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight &&
        activeLink
      ) {
        document
          .querySelectorAll(".sidebar-nav a")
          .forEach((link) => link.classList.remove("active"));
        activeLink.classList.add("active");
      }
    });
  };

  // Prevent auto-scroll to bottom if there's no hash in the URL
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <div className="privacy-page">
      <div className="privacy-header"></div>

      <div className="privacy-container">
        <div className="privacy-sidebar">
          <h2 className="sidebar-title">Contents</h2>
          <ul className="sidebar-nav">
            <li>
              <a
                href="#introduction"
                onClick={(e) => scrollToSection(e, "introduction")}
                className="active"
              >
                Introduction
              </a>
            </li>
            <li>
              <a
                href="#information-we-collect"
                onClick={(e) => scrollToSection(e, "information-we-collect")}
              >
                Information We Collect
              </a>
            </li>
            <li>
              <a
                href="#how-we-use"
                onClick={(e) => scrollToSection(e, "how-we-use")}
              >
                How We Use Your Information
              </a>
            </li>
            <li>
              <a
                href="#legal-basis"
                onClick={(e) => scrollToSection(e, "legal-basis")}
              >
                Legal Basis for Processing
              </a>
            </li>
            <li>
              <a href="#rights" onClick={(e) => scrollToSection(e, "rights")}>
                Your Rights
              </a>
            </li>
            <li>
              <a href="#sharing" onClick={(e) => scrollToSection(e, "sharing")}>
                Sharing Your Information
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="privacy-content-wrapper">
          <div className="privacy-content">
            <h2>CineNiche Privacy Policy</h2>
            <p className="updated-date">LAST UPDATED: APRIL 2025</p>

            <div id="introduction">
              <p className="intro-text">
                At CineNiche, we are committed to protecting your privacy. This
                Privacy Policy outlines how we collect, use, share, and protect
                your personal data in compliance with the General Data
                Protection Regulation (GDPR).
              </p>
            </div>

            <h3 id="information-we-collect">Information We Collect</h3>
            <p className="section-subtitle">Information You Provide to Us</p>
            <ul className="privacy-list">
              <li>
                Registration details such as name, email address, password, date
                of birth, and billing information.
              </li>
              <li>
                Profile preferences including language, genres, and favorite
                shows.
              </li>
              <li>
                Communication data like messages sent to our support team.
              </li>
            </ul>

            <p className="section-subtitle">
              Information We Collect Automatically
            </p>
            <ul className="privacy-list">
              <li>
                Usage data (e.g., watch history, clicks, and navigation
                patterns).
              </li>
              <li>
                Device and technical info (e.g., IP address, device type,
                browser).
              </li>
              <li>
                Cookies and similar tracking technologies for analytics and
                personalization.
              </li>
            </ul>

            <h3 id="how-we-use">How We Use Your Information</h3>
            <ul className="privacy-list">
              <li>To deliver and maintain our streaming service</li>
              <li>To personalize content recommendations</li>
              <li>To communicate service updates and offers</li>
              <li>To ensure security and prevent abuse</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h3 id="legal-basis">Legal Basis for Processing</h3>
            <ul className="privacy-list">
              <li>
                <strong>Consent:</strong> When you provide explicit permission
                for us to use your data.
              </li>
              <li>
                <strong>Contract:</strong> When processing is necessary to
                fulfill our agreement with you (e.g., account creation).
              </li>
              <li>
                <strong>Legal Obligation:</strong> To comply with applicable
                laws and regulations.
              </li>
              <li>
                <strong>Legitimate Interest:</strong> For business interests
                such as service improvement, while respecting your privacy
                rights.
              </li>
            </ul>

            <h3 id="rights">Your Rights Under GDPR</h3>
            <ul className="privacy-list">
              <li>
                <strong>Right to Access:</strong> You can request copies of your
                personal data.
              </li>
              <li>
                <strong>Right to Rectification:</strong> You can ask us to
                correct inaccurate information.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You can request deletion of
                your data, under certain conditions.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> You can request
                that we limit how we use your data.
              </li>
              <li>
                <strong>Right to Object:</strong> You can object to our use of
                your data based on legitimate interests.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You can request your
                data in a format that allows it to be transferred to another
                provider.
              </li>
              <li>
                <strong>Right to Lodge a Complaint:</strong> You may file a
                complaint with a supervisory authority in your EU country.
              </li>
            </ul>

            <h3 id="sharing">Sharing Your Information</h3>
            <ul className="privacy-list">
              <li>Third-party processors under data protection agreements</li>
              <li>Legal authorities when required by law</li>
              <li>In connection with mergers or acquisition events</li>
            </ul>

            <h3 id="contact">Contact Us</h3>
            <p>
              If you have questions about this Privacy Policy or want to
              exercise your rights, contact us at:
            </p>
            <p className="contact-address">
              CineNiche, Inc.
              <br />
              Data Protection Officer
              <br />
              123 Film Street
              <br />
              Hollywood, CA 90028
              <br />
              Email:{" "}
              <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;