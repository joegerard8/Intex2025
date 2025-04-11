import React, { useEffect } from 'react';
import './privacy.css';

const Privacy: React.FC = () => {
    // Function to scroll to a specific section of the page and highlight the corresponding link in the sidebar
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault(); // Prevent the default anchor link behavior (page reload)
        const element = document.getElementById(id); // Find the target section by its ID
        if (element) {
            // Smoothly scroll to the target section
            element.scrollIntoView({ behavior: 'smooth' });

            // Remove 'active' class from all sidebar links
            const links = document.querySelectorAll('.sidebar-nav a');
            links.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the clicked link to highlight it in the sidebar
            e.currentTarget.classList.add('active');
        }
    };

    // Side effect hook to handle scroll-based functionality (e.g., update sidebar active link on scroll)
    useEffect(() => {
        const handleScroll = () => {
            // Get all sections that have an 'h3' tag with an 'id' attribute
            const sections = document.querySelectorAll('h3[id]');
            const scrollPosition = window.scrollY + 100; // Scroll position, offset by 100px for early highlight

            // Loop through each section to determine which section is in view
            sections.forEach(section => {
                const sectionElement = section as HTMLElement;
                const sectionTop = sectionElement.offsetTop; // Get the top position of the section
                const sectionHeight = sectionElement.offsetHeight; // Get the height of the section
                const sectionId = sectionElement.getAttribute('id') || ''; // Get the section's ID

                // Check if the current scroll position is within the section's bounds
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove 'active' class from all sidebar links
                    const links = document.querySelectorAll('.sidebar-nav a');
                    links.forEach(link => link.classList.remove('active'));

                    // Add 'active' class to the sidebar link that corresponds to the visible section
                    const activeLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        };

        // Attach scroll event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component is unmounted or rerendered
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="privacy-page">
            {/* Black header strip for the page */}
            <div className="privacy-header"></div>

            <div className="privacy-container">
                {/* Sidebar Navigation */}
                <div className="privacy-sidebar">
                    <h2 className="sidebar-title">Contents</h2>
                    <ul className="sidebar-nav">
                        {/* Navigation links, each triggers scrollToSection on click */}
                        <li><a href="#introduction" onClick={(e) => scrollToSection(e, 'introduction')} className="active">Introduction</a></li>
                        <li><a href="#information-we-collect" onClick={(e) => scrollToSection(e, 'information-we-collect')}>Information We Collect</a></li>
                        <li><a href="#how-we-use" onClick={(e) => scrollToSection(e, 'how-we-use')}>How We Use Your Information</a></li>
                        <li><a href="#sharing" onClick={(e) => scrollToSection(e, 'sharing')}>Sharing Your Information</a></li>
                        <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact Us</a></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="privacy-content-wrapper">
                    <div className="privacy-content">
                        {/* Privacy Policy Title and Updated Date */}
                        <h2>CineNiche Privacy Policy</h2>
                        <p className="updated-date">LAST UPDATED: APRIL 2025</p>

                        {/* Introduction Section */}
                        <div id="introduction">
                            <p className="intro-text">
                                At CineNiche, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our streaming service, website, and mobile application. By accessing our service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
                            </p>
                        </div>

                        {/* Information We Collect Section */}
                        <h3 id="information-we-collect">Information We Collect</h3>
                        <p className="section-subtitle">Information You Provide to Us</p>
                        <ul className="privacy-list">
                            {/* List of information collected from the user */}
                            <li>Account information: When you register an account, we collect your name, email address, phone number, password, age, gender, location/ZIP code, and payment information.</li>
                            <li>Profile information: User preferences, viewing history, watchlists, and ratings.</li>
                            <li>Communications: We store correspondence when you contact our customer service.</li>
                        </ul>

                        <p className="section-subtitle">Information We Collect Automatically</p>
                        <ul className="privacy-list">
                            {/* List of automatically collected information */}
                            <li>Usage Information: Information about your interactions with our Service, including viewing history, search queries, and how you interact with content.</li>
                            <li>Location Information: General location information based on your IP address.</li>
                            <li>Device and Browser Information: We collect cookies and data regarding your device, browser type, referring/exit pages, and timestamps.</li>
                            <li>Content and Cookies: We collect cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
                        </ul>

                        {/* How We Use Your Information Section */}
                        <h3 id="how-we-use">How We Use Your Information</h3>
                        <p>We use the information we collect to:</p>
                        <ul className="privacy-list">
                            {/* List of ways in which we use the collected information */}
                            <li>Provide, maintain, and improve our service</li>
                            <li>Process transactions and send transactional communications</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Send emails and push notifications related to your account</li>
                            <li>Personalize your experience, including content recommendations</li>
                            <li>Monitor and analyze trends, usage, and activities</li>
                            <li>Detect, prevent, and address technical issues or illegal activities</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        {/* Sharing Your Information Section */}
                        <h3 id="sharing">Sharing Your Information</h3>
                        <p>We may share your information with:</p>
                        <ul className="privacy-list">
                            {/* List of parties with whom we may share user information */}
                            <li>Service providers who perform services for us</li>
                            <li>Business partners with your consent</li>
                            <li>Other third parties with your consent</li>
                            <li>In response to legal process or government requests</li>
                            <li>To protect our rights, privacy, safety, or property</li>
                            <li>In connection with a merger, sale, or acquisition</li>
                        </ul>

                        {/* Contact Us Section */}
                        <h3 id="contact">Contact Us</h3>
                        <p>If you have questions about this Privacy Policy, please contact us at privacy@cineniche.com or write to us at:</p>
                        <p className="contact-address">
                            CineNiche, Inc.<br />
                            Privacy Department<br />
                            123 Film Street<br />
                            Hollywood, CA 90028
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
