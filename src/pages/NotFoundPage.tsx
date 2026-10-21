import { Link } from 'react-router-dom';

/** Placeholder for routes that exist in the CMS but have no React view yet. */
export function NotFoundPage() {
  return (
    <div className="status">
      <h1>This page isn't built yet</h1>
      <p>Only the home page is wired to Umbraco so far.</p>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </div>
  );
}
