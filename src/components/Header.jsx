export function Header({ route, menuOpen }) {
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      {"\n    "}
      <div className="container position-relative d-flex align-items-center justify-content-between">
        {"\n\n      "}
        <a href="/" className="logo d-flex align-items-center me-auto me-xl-0">
          {"\n        "}
          <span className="sitename">
            {"Olimpid"}
          </span>
          {"\n      "}
        </a>
        {"\n\n      "}
        <nav id="navmenu" className="navmenu">
          {"\n        "}
          <ul>
            {"\n          "}
            <li>
              <a href="/" className={route === "/" ? "active" : undefined} aria-current={route === "/" ? "page" : undefined}>
                {"Home"}
              </a>
            </li>
            {"\n          "}
            <li>
              <a href="/about" className={route === "/about" ? "active" : undefined} aria-current={route === "/about" ? "page" : undefined}>
                {"About"}
              </a>
            </li>
            {"\n          "}
            <li>
              <a href="/programs" className={route === "/programs" ? "active" : undefined} aria-current={route === "/programs" ? "page" : undefined}>
                {"Programs"}
              </a>
            </li>
            {"\n          "}
            <li>
              <a href="/destinations" className={route === "/destinations" ? "active" : undefined} aria-current={route === "/destinations" ? "page" : undefined}>
                {"Study Destinations"}
              </a>
            </li>
            {"\n          "}
            <li>
              <a href="/contact" className={route === "/contact" ? "active" : undefined} aria-current={route === "/contact" ? "page" : undefined}>
                {"Contact"}
              </a>
            </li>
            {"\n        "}
          </ul>
          {"\n        "}
          <button type="button" className={`mobile-nav-toggle d-xl-none ${menuOpen ? "bi bi-x" : "bi bi-list"}`} aria-label="Toggle navigation" aria-expanded={menuOpen}></button>
          {"\n      "}
        </nav>
        {"\n\n      "}
        <a className="btn-getstarted" href="/contact">
          {"Apply"}
        </a>
        {"\n\n    "}
      </div>
      {"\n  "}
    </header>
  );
}
