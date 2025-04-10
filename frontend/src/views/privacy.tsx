import React, { useEffect } from 'react';
import './privacy.css';

const Privacy: React.FC = () => {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            const links = document.querySelectorAll('.sidebar-nav a');
            links.forEach(link => link.classList.remove('active'));
            e.currentTarget.classList.add('active');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('h3[id]');
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionElement = section as HTMLElement;
                const sectionTop = sectionElement.offsetTop;
                const sectionHeight = sectionElement.offsetHeight;
                const sectionId = sectionElement.getAttribute('id') || '';

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const links = document.querySelectorAll('.sidebar-nav a');
                    links.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="privacy-page">
            {/* Just the black header strip */}
            <div className="privacy-header"></div>

            <div className="privacy-container">
                {/* Sidebar Navigation */}
                <div className="privacy-sidebar">
                    <h2 className="sidebar-title">Contents</h2>
                    <ul className="sidebar-nav">
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
                        <h2>CineNiche Privacy Policy</h2>
                        <p className="updated-date">LAST UPDATED: APRIL 2025</p>

                        <div id="introduction">
                            <p className="intro-text">
                                At CineNiche, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our streaming service, website, and mobile application. By accessing our service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
                            </p>
                        </div>

                        <h3 id="information-we-collect">Information We Collect</h3>
                        <p className="section-subtitle">Information You Provide to Us</p>
                        <ul className="privacy-list">
                            <li>Account information: When you register an account, we collect your name, email address, phone number, password, age, gender, location/ZIP code, and payment information.</li>
                            <li>Profile information: User preferences, viewing history, watchlists, and ratings.</li>
                            <li>Communications: We store correspondence when you contact our customer service.</li>
                        </ul>

                        <p className="section-subtitle">Information We Collect Automatically</p>
                        <ul className="privacy-list">
                            <li>Usage Information: Information about your interactions with our Service, including viewing history, search queries, and how you interact with content.</li>
                            <li>Location Information: General location information based on your IP address.</li>
                            <li>Device and Browser Information: We collect cookies and data regarding your device, browser type, referring/exit pages, and timestamps.</li>
                            <li>Content and Cookies: We collect cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
                        </ul>

                        <h3 id="how-we-use">How We Use Your Information</h3>
                        <p>We use the information we collect to:</p>
                        <ul className="privacy-list">
                            <li>Provide, maintain, and improve our service</li>
                            <li>Process transactions and send transactional communications</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Send emails and push notifications related to your account</li>
                            <li>Personalize your experience, including content recommendations</li>
                            <li>Monitor and analyze trends, usage, and activities</li>
                            <li>Detect, prevent, and address technical issues or illegal activities</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h3 id="sharing">Sharing Your Information</h3>
                        <p>We may share your information with:</p>
                        <ul className="privacy-list">
                            <li>Service providers who perform services for us</li>
                            <li>Business partners with your consent</li>
                            <li>Other third parties with your consent</li>
                            <li>In response to legal process or government requests</li>
                            <li>To protect our rights, privacy, safety, or property</li>
                            <li>In connection with a merger, sale, or acquisition</li>
                        </ul>

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
