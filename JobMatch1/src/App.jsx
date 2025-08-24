import React, { useState } from "react";

// Brand
import logo from "./assets/logo.svg";

// Your images (placed in JobMatch1/src/pictures)
import resume from "./pictures/resume.jpeg";
import constructionGuy from "./pictures/constructionGuy.jpg";
import darts from "./pictures/darts.jpeg";
import deal from "./pictures/deal.jpg";
import deal2 from "./pictures/deal2.jpeg";
import deal3 from "./pictures/deal3.jpeg";
import penBook from "./pictures/penBook.jpg";

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`section ${className}`}>
    {children}
  </section>
);

export default function App() {
  const [faqOpen, setFaqOpen] = useState(null);
  const year = new Date().getFullYear();

  return (
    <div className="app">
      {/* Top strip */}
      <div className="topstrip">
        <div className="container topstrip__in">
          <p>Contractors: Elevate Your Resume, Secure Your Future.</p>
          <nav className="smallnav">
            <a href="#signin">Sign In</a>
            <a href="#login">Login</a>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container header__in">
          <div className="brand">
            <img src={logo} alt="" /> <span>Contractors Agency</span>
          </div>
          <nav className="nav">
            <a href="#">Home</a>
            <a href="#about">About us</a>
            <a href="#solutions">Solution</a>
            <a href="#services">Services</a>
            <a className="btn btn--ghost" href="#contact">
              Get Hired
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <Section className="hero">
        <div className="container hero__in">
          <div className="hero__left">
            <span className="badge">Top Choice</span>
            <h1>Unlock Your Potential: Connect with Top Companies</h1>
            <p className="lead">
              We specialize in showcasing contractor resumes to leading
              companies, ensuring your skills reach the right employers. Elevate
              your career today!
            </p>

            <form
              className="cta"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! We’ll be in touch.");
              }}
            >
              <input placeholder="Enter your email" type="email" required />
              <button className="btn">Get Started</button>
            </form>

            <div className="hero__chips">
              <div className="chip">Over 1,000 placements</div>
              <div className="quote">“Fast results, highly recommended service.”</div>
            </div>
          </div>

          <div className="hero__right">
            <div className="clock">
              <div className="ring"></div>
              <div className="clock__text">
                <strong>24 H</strong>
                <span>Service</span>
              </div>
            </div>
            {/* Main hero image (construction) */}
            <img src={constructionGuy} alt="Construction worker on site" />
          </div>
        </div>
      </Section>

      {/* About band */}
      <Section id="about" className="about">
        <div className="container about__in">
          <h2>
            Our mission is to connect skilled contractors with leading
            companies, fostering mutual growth and success in every placement.
          </h2>

          <div className="about__side">
            <p>
              We strive to empower contractors by providing unparalleled access
              to top-tier opportunities, ensuring their expertise is recognized
              and valued.
            </p>
            <div className="counters">
              <div>
                <strong>1000+</strong>
                <span>Contractors Placed</span>
              </div>
              <div>
                <strong>500+</strong>
                <span>Companies Hiring</span>
              </div>
              <div>
                <strong>95%</strong>
                <span>Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Solutions alternating */}
      <Section id="solutions" className="solutions">
        {/* 1 */}
        <div className="container alt">
          <div className="alt__img">
            <div className="imgCard">
              <img src={resume} alt="Resume optimization" />
            </div>
          </div>
          <div className="alt__copy">
            <h3>Resume Optimization: Crafting a standout professional profile</h3>
            <p>
              We refine your resume to highlight your key skills and experience,
              ensuring it captures the attention of top companies. Maximize
              impact!
            </p>
            <a className="btn" href="#contact">
              Learn More
            </a>
          </div>
        </div>

        {/* 2 */}
        <div className="container alt alt--right">
          <div className="alt__copy">
            <h3>Resume Distribution: Expanding your reach</h3>
            <p>
              We distribute your resume to our network of partner companies,
              maximizing exposure and increasing your chances of securing
              interviews.
            </p>
            <a className="btn btn--outline" href="#contact">
              See How
            </a>
          </div>
          <div className="alt__img">
            <div className="imgCard">
              <img src={deal} alt="Handshake after agreement" />
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="container alt">
          <div className="alt__img">
            <div className="imgCard">
              <img src={darts} alt="Targeted advertising" />
            </div>
          </div>
          <div className="alt__copy">
            <h3>Targeted Advertising: Reaching the right employers</h3>
            <p>
              We strategically advertise your resume to companies seeking your
              specific skills, increasing visibility and placement opportunities.
              Get noticed!
            </p>
            <a className="btn" href="#contact">
              View Plans
            </a>
          </div>
        </div>
      </Section>

      {/* Why choose grid */}
      <Section id="services" className="why">
        <div className="container">
          <h2>Why Choose Contractors for Your Career?</h2>
          <p className="center lead">
            We connect contractors with top companies, offering unparalleled
            career opportunities and maximizing professional growth.
          </p>
        </div>

        <div className="container">
          <div className="cards">
            <article>
              <h4>Extensive Company Network</h4>
              <p>
                Access a vast network of leading companies actively seeking
                skilled contractors. More opportunities await you!
              </p>
            </article>
            <article className="primary">
              <h4>Targeted Advertising</h4>
              <p>
                We strategically advertise your resume to companies seeking your
                specific skills. Increase your visibility now!
              </p>
            </article>
            <article>
              <h4>Expert Resume</h4>
              <p>
                Craft a standout resume that highlights your key skills and
                experience. Get noticed by top employers!
              </p>
            </article>
            <article>
              <h4>Proven Results</h4>
              <p>
                We have a track record of successfully connecting contractors
                with top companies. Achieve your career goals with us!
              </p>
            </article>
            <article>
              <h4>Dedicated Support</h4>
              <p>
                Receive personalized support and guidance throughout the
                placement process. We're here to help you succeed!
              </p>
            </article>
            <article>
              <h4>Fast Placement</h4>
              <p>
                Get placed quickly with our efficient resume advertising
                strategies. Start your new role sooner!
              </p>
            </article>
          </div>
        </div>
      </Section>

      {/* Plans */}
      <Section className="plans">
        <div className="container">
          <h2>Pick the plan that works</h2>
          <div className="planGrid">
            <div className="plan">
              <h5>Just find me a job!</h5>
              <h3>
                1% salary <br />
                takeaway / month
              </h3>
              <ul>
                <li>Advertise your resume</li>
                <li>Get great opportunities</li>
              </ul>
              <button className="btn dark">Get Started</button>
            </div>
            <div className="plan">
              <h5>Full Services</h5>
              <h3>
                2% salary <br />
                takeaway / month
              </h3>
              <ul>
                <li>Advertise your resume</li>
                <li>Increased opportunities</li>
                <li>Setup Interviews</li>
                <li>Find highest possible salary</li>
                <li>Reports on interviewing company</li>
              </ul>
              <button className="btn dark">Get Started</button>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="testimonials">
        <div className="container">
          <h4 className="eyebrow">Real Success Stories</h4>
          <h2>What Our Clients Say</h2>
          <div className="tgrid">
            <article>
              <h4>Great service, quick placement!</h4>
              <p>
                Contractors helped me land my dream role in just weeks. Their
                targeted approach made all the difference.
              </p>
            </article>
            <article>
              <h4>Unmatched expertise, great network!</h4>
              <p>
                I was struggling to find the right opportunities until I
                partnered with Contractors. Their expertise and network are
                unmatched.
              </p>
            </article>
            <article className="wide">
              <h4>Perfect match, efficient service!</h4>
              <p>
                They matched me with a perfect role quickly and efficiently.
                Highly recommend to any contractor seeking new opportunities.
              </p>
            </article>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="faq">
        <div className="container faq__in">
          <div className="faq__left">
            <h2>Frequently Asked Questions</h2>
            <p className="lead">
              Find answers to common questions about our services, placement
              process, and how we can help you.
            </p>
          </div>

          <div className="faq__list">
            {[
              {
                q: "How does it work?",
                a:
                  "We connect you with job opportunities tailored to your preferences and career goals. Our team researches each company and presents your resume directly to them, increasing your chances of being noticed. In many cases, this results in interviews that can lead to the right position for you. Get in touch with us today to learn more!"
              },
              {
                q: "What are the fees?",
                a:
                  "Our fees are transparent and competitive. We offer various packages to suit your needs. Contact us for details!"
              },
              {
                q: "What industries do you serve?",
                a:
                  "We serve a wide range of industries, including IT, finance, engineering, healthcare, and more. We cover most sectors."
              },
              {
                q: "How fast is placement?",
                a:
                  "Placement speed varies, but we prioritize efficiency. Many contractors find roles within weeks of optimizing their resume with us."
              },
              {
                q: "What kind of support do you offer?",
                a:
                  "We provide ongoing support and guidance throughout your contract, ensuring your success and satisfaction. We are always here to help!"
              }
            ].map(({ q, a }, i) => (
              <details
                key={i}
                open={faqOpen === i}
                onToggle={(e) => setFaqOpen(e.target.open ? i : null)}
              >
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>


      {/* Blog / Insights */}
      <Section className="blog">
        <div className="container">
          <div className="blog__head">
            <h2>Insights and Career Advice</h2>
            <p className="lead">
              Stay updated with the latest industry trends and career advice.
              Empowering contractors for professional growth and success.
            </p>
          </div>
          <div className="blogGrid">
            <article>
              <img src={penBook} alt="Work desk with notes" />
              <h4>Crafting the Perfect Contractor Resume</h4>
              <p>Highlight your skills and experience effectively. Get the job!</p>
            </article>
            <article>
              <img src={deal2} alt="Contract review meeting" />
              <h4>The Benefits of Contract Work</h4>
              <p>Explore flexibility, higher pay and diverse experiences.</p>
            </article>
            <article>
              <img src={deal3} alt="Negotiation at desk" />
              <h4>Negotiating Your Contractor Rate Effectively</h4>
              <p>Maximize your earning potential and secure the best compensation.</p>
            </article>
          </div>
        </div>
      </Section>

      {/* CTA band */}
      <Section className="ctaBand" id="contact">
        <div className="container ctab__in">
          <div className="ctab__copy">
            <h2>Ready to Elevate Your Career?</h2>
            <p className="lead">
              Let us help you connect with top companies and secure your next
              contract role. Start today!
            </p>
            <form
              className="cta large"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! We’ll be in touch.");
              }}
            >
              <input placeholder="Enter your email" type="email" required />
              <button className="btn">Get Started</button>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <div className="container foot__in">
          <div className="fleft">
            <h4>Contractors Agency</h4>
            <p>
              We advertise contractor resumes to top companies, connecting
              talent with great opportunities. Contact us today!
            </p>
            <div className="icons">◎ ✕ ƒ</div>
          </div>
          <div className="fright">
            <h4>Contact us</h4>
            <p>
              info@contractorsagency.com
              <br />
              555-123-4567
            </p>
            <a className="btn" href="#contact">
              Contact Us Now
            </a>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "12px 0", color: "#6b7280" }}>
          © {year} Contractors Agency
        </div>
      </footer>
    </div>
  );
}
