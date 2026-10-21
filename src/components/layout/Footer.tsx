import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

const SHOP_LINKS = [
  ['/shop-online/', 'Shop Online'],
  ['/recipes/', 'Recipes'],
  ['/stores/', 'Store Locator'],
] as const;

const ABOUT_LINKS = [
  ['/about-us/', 'About us'],
  ['/quality-safety/', 'Quality & Safety'],
  ['/faqs/', 'FAQs'],
  ['/news/', 'News'],
  ['/contact-us/', 'Contact Us'],
] as const;

const LEGAL_LINKS = [
  ['/disclaimer/', 'Disclaimer'],
  ['/terms-and-conditions/', 'Terms and Conditions'],
  ['/paia-manual/', 'PAIA Manual'],
  ['/privacy-policy/', 'Privacy Policy'],
  ['/cookie-policy/', 'Cookie Policy'],
] as const;

const SOCIALS = [
  ['/facebook/', 'Facebook', 'M13.5 9H10.5V7.5C10.5 6.67 11.17 6 12 6H13.5V4.13C13.2 4.11 12.5 4 11.7 4C10 4 8.5 5.38 8.5 7.2V9H5.5V11.4H8.5V20H10.5V11.4H13.2L13.5 9Z'],
  ['/instagram/', 'Instagram', 'M12 8.4A3.6 3.6 0 1 0 12 15.6A3.6 3.6 0 1 0 12 8.4M12 4.8C13.6 4.8 14 4.85 14.6 4.92C15.2 5 15.5 5.1 15.7 5.2C16 5.3 16.3 5.5 16.6 5.8C16.9 6.1 17.1 6.4 17.2 16.6C17.3 7 16.9 7.3 16.6 7.6C16.3 7.9 16 8.1 15.7 8.2C15.5 8.3 15.2 8.4 14.6 8.5C14 8.6 13.6 8.6 12 8.6C10.4 8.6 10 8.6 9.4 8.5C8.8 8.4 8.5 8.3 8.3 8.2C8 8.1 7.7 7.9 7.4 7.6C7.1 7.3 6.9 7 6.8 6.6C6.7 6 6.6 5.6 6.6 4.6C6.6 3.6 6.7 3.2 6.8 2.6C6.9 2.2 7.1 1.9 7.4 1.6C7.7 1.3 8 1.1 8.3 1C8.5 0.9 8.8 0.8 9.4 0.7C10 0.6 10.4 0.6 12 0.6C13.6 0.6 14 0.6 14.6 0.7C15.2 0.8 15.5 0.9 15.7 1C16 1.1 16.3 1.3 16.6 1.6C16.9 1.9 17.1 2.2 17.2 2.6C17.3 3.2 17.4 3.6 17.4 4.6C17.4 5.6 17.3 6 17.2 6.6C17.1 7 16.9 7.3 16.6 7.6C16.3 7.9 16 8.1 15.7 8.2C15.5 8.3 15.2 8.4 14.6 8.5C14 8.6 13.6 8.6 12 8.6M12 2C8.14 2 7.5 2.04 6.46 2.17C5.44 2.3 4.72 2.55 4.13 3.13C3.54 3.71 3.3 4.44 3.16 5.46C3.04 6.5 3 7.14 3 12C3 16.86 3.04 17.5 3.16 18.54C3.3 19.56 3.54 20.28 4.13 20.87C4.72 21.45 5.44 21.7 6.46 21.83C7.5 21.97 8.14 22 12 22C15.86 22 16.5 21.96 17.54 21.83C18.56 21.69 19.28 21.45 19.87 20.87C20.46 20.29 20.7 19.56 20.84 18.54C20.97 17.5 21 16.86 20.96 21 12C21 7.14 20.96 6.5 20.84 5.46C20.7 4.44 20.46 3.71 19.87 3.13C19.28 2.55 18.56 2.3 17.54 2.16C16.5 2.04 15.86 2 12 2M12 10.6A1.4 1.4 0 1 0 12 13.4A1.4 1.4 0 1 0 12 10.6Z'],
  ['/youtube/', 'YouTube', 'M21.6 7.2C21.4 6.4 20.8 5.8 20 5.6C18.8 5.3 12 5.3 12 5.3C12 5.3 5.2 5.3 4 5.6C3.2 5.8 2.6 6.4 2.4 7.2C2.1 8.4 2.1 12 2.1 12C2.1 12 2.1 15.6 2.4 16.8C2.6 17.6 3.2 18.2 4 18.4C5.2 18.7 12 18.7 12 18.7C12 18.7 18.8 18.7 20 18.4C20.8 18.2 21.4 17.6 21.6 16.8C21.9 15.6 21.9 12 21.9 12C21.9 12 21.9 8.4 21.6 7.2M10 15.1V8.9L15.5 12L10 15.1Z'],
] as const;

type LinkList = readonly (readonly [string, string])[];

function LinkColumn({ links, className = '' }: { links: LinkList; className?: string }) {
  return (
    <ul className={className}>
      {links.map(([to, label]) => (
        <li key={to}><Link to={to}>{label}</Link></li>
      ))}
    </ul>
  );
}

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      {/* Newsletter band — transitions the page into the footer. */}
      <div className="site-footer__newsletter">
        <div className="site-footer__newsletter-inner">
          <h2 className="site-footer__newsletter-title">NEWSLETTER</h2>
          <p className="site-footer__newsletter-hint">Get all the latest specials and news</p>
          <form className="newsletter" onSubmit={onSubmit}>
            <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" required placeholder="Email Address *" />
            <button type="submit" className="btn btn--primary">
              {subscribed ? 'Thank you' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      <div className="site-footer__content">
        <div className="site-footer__block">
          <LinkColumn links={SHOP_LINKS} />
        </div>

        <div className="site-footer__block">
          <LinkColumn links={ABOUT_LINKS} />
        </div>

        <div className="site-footer__block site-footer__block--hygiene">
          <LinkColumn links={LEGAL_LINKS} />
        </div>

        <div className="site-footer__block site-footer__block--last">
          <div className="site-footer__copyright">
            <span>© {new Date().getFullYear()} Eskort. All rights reserved.</span>
            <div className="site-footer__social">
              {SOCIALS.map(([to, label, path]) => (
                <a key={to} href={to} aria-label={label}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
