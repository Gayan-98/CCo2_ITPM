// src/Home1.jsx
import React, { useEffect } from 'react';
import './Home1.scss'; // Import the SCSS file

const Home1 = () => {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    for (const link of links) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerOffset = 100; // Adjust this based on your fixed header size
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      });
    }

    // Add scroll event for smooth animations
    const handleScroll = () => {
      const features = document.querySelectorAll('.feature-card');
      features.forEach((feature) => {
        const rect = feature.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          feature.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="button-container">
        <button className="fixed-button">Login</button>
        <button className="fixed-button">Sign Up</button>
      </div>

      <div className="hero">
        <h1 className="title">Welcome to CCO2</h1>
        <h2 className="subtitle">AI-Powered Platform for Boosting Programming Skills</h2>
        <div className="icon-container">
          <i className="eye-icon fas fa-eye"></i>
        </div>
        <img src={require('./cco22.png')} alt="Hero" className="hero-image" />
      </div>

      <div className="features">
        <div className="feature-card">
          <img src={require('./image2.png')} alt="IDE Features" className="features-image" />
          <h3 className="features-description">Our IDE supports 5 programming languages including JavaScript, Java, Python, C++, and Ruby.</h3>
        </div>
        <div className="feature-card">
          <img src={require('./image3.png')} alt="Summary Reports" className="features-image" />
          <h3 className="features-description">Interactive summary reports to track your progress and performance.</h3>
        </div>
      </div>

      <div className="image-section">
        <img src={require('./cco2.png')} alt="Community" className="community-image" />
      </div>

      <footer className="footer">
        <div className="footer-content">Highlighting AI-Powered Platform for Coding</div>
      </footer>
    </div>
  );
};

export default Home1;
