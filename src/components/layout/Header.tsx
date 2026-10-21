import { Link, NavLink } from 'react-router-dom';
import { CartIcon, ChevronDown, LocationIcon, SearchIcon } from '../ui/Icons';

// Static navigation: the Delivery API response for the home page carries no menu data.
const NAV = [
  { to: '/shop-online/', label: 'Shop Online' },
  { to: '/recipes/', label: 'Recipes' },
  { to: '/stores/', label: 'Stores' },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Eskort home">
          <img src="/images/logo.svg" alt="Eskort" className="site-header__logo" width={109} height={30} />
        </Link>

        <nav aria-label="Main" className="site-header__nav">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <div className="site-header__location">
            <LocationIcon />
            <button type="button" className="site-header__store">
              Select Store...
              <ChevronDown width={8} height={4} />
            </button>
          </div>
          <div className="site-header__search">
            <label className="visually-hidden" htmlFor="site-search">Search</label>
            <input id="site-search" type="search" className="site-header__search-input" placeholder="Search" />
            <button type="button" className="site-header__search-btn" aria-label="Search">
              <SearchIcon width={18} height={18} />
            </button>
          </div>
          <Link to="/sign-in/" className="site-header__user">Sign In</Link>
          <Link to="/cart/" className="site-header__cart" aria-label="Cart">
            <CartIcon width={20} height={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
