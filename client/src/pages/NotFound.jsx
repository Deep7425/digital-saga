import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-1 fw-bold" style={{ color: 'hsl(249, 83%, 63%)' }}>404</h1>
        <p className="fs-3">
          <span className="text-danger">Oops!</span> Page not found.
        </p>
        <p className="fs-5 text-muted">
          The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <button className="btn btn-primary-custom btn-lg mt-3">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}