export function Footer() {
  return (
    <footer id="footer" className="footer position-relative dark-background">
      {"\n\n    "}
      <div className="container">
        {"\n      "}
        <div className="row gy-5">
          {"\n\n  "}
          <div className="col-lg-4 col-md-6">
            {"\n          "}
            <div className="footer-content">
              {"\n            "}
              <a href="/" className="logo d-flex align-items-center mb-4">
                {"\n              "}
                <span className="sitename">
                  {"Olimpid"}
                </span>
                {"\n            "}
              </a>
              {"\n            "}
              <p className="mb-4">
                {"   Olimpid is Nigeria’s trusted study abroad agency, helping students secure admissions, scholarships, and visas to top universities worldwide. Your global education journey starts here.\n "}
              </p>
              {"\n  Follow us on Instagram  "}
              <a href="https://instagram.com/olimpidconsult?igsh=cG5ieWY4ajl1OWgz" target="_blank" className="social-icon" rel="noopener noreferrer">
                {"\n  "}
                <i className="bi bi-instagram"></i>
                {"\n"}
              </a>
              {"\n          "}
            </div>
            {"\n        "}
          </div>
          {"\n\n  "}
          <div className="col-lg-3 col-md-6">
            {"\n          "}
            <div className="footer-links">
              {"\n            "}
              <h4>
                {"Quick Links"}
              </h4>
              {"\n            "}
              <ul>
                {"\n              "}
                <li>
                  <a href="/about">
                    <i className="bi bi-chevron-right"></i>
                    {" About"}
                  </a>
                </li>
                {"\n              "}
                <li>
                  <a href="/destinations">
                    <i className="bi bi-chevron-right"></i>
                    {" Study destinations"}
                  </a>
                </li>
                {"\n              "}
                <li>
                  <a href="/programs">
                    <i className="bi bi-chevron-right"></i>
                    {" Programs"}
                  </a>
                </li>
                {"\n              "}
                <li>
                  <a href="/contact">
                    <i className="bi bi-chevron-right"></i>
                    {" Contact"}
                  </a>
                </li>
                {"\n            "}
              </ul>
              {"\n          "}
            </div>
            {"\n        "}
          </div>
          {"\n\n\n  "}
          <div className="col-lg-5 col-md-12">
            {"\n          "}
            <div className="footer-contact">
              {"\n            "}
              <h4>
                {"Get in Touch"}
              </h4>
              {"\n            "}
              <div className="contact-item">
                {"\n              "}
                <div className="contact-icon">
                  {"\n                "}
                  <i className="bi bi-geo-alt"></i>
                  {"\n              "}
                </div>
                {"\n              "}
                <div className="contact-info">
                  {"\n                "}
                  <p>
                    <strong>
                      {"Headquarters:"}
                    </strong>
                    <br />
                    {"Moscow, Russia"}
                  </p>
                  {"\n                "}
                  <p>
                    <strong>
                      {"Nigeria Office:"}
                    </strong>
                    <br />
                    {"41B Adeojo Estate, Ibadan, Nigeria"}
                  </p>
                  {"\n              "}
                </div>
                {"\n            "}
              </div>
              {"\n\n            "}
              <div className="contact-item">
                {"\n              "}
                <div className="contact-icon">
                  {"\n                "}
                  <i className="bi bi-telephone"></i>
                  {"\n              "}
                </div>
                {"\n              "}
                <div className="contact-info">
                  {"\n                "}
                  <a href="tel:+2348158560940">
                    {"+2348158560940"}
                  </a>
                  {"\n              "}
                </div>
                {"\n            "}
              </div>
              {"\n\n            "}
              <div className="contact-item">
                {"\n              "}
                <div className="contact-icon">
                  {"\n                "}
                  <i className="bi bi-envelope"></i>
                  {"\n              "}
                </div>
                {"\n              "}
                <div className="contact-info">
                  {"\n                "}
                  <a href="mailto:limpidconsult@gmail.com">
                    {"limpidconsult@gmail.com"}
                  </a>
                  {"\n              "}
                </div>
                {"\n            "}
              </div>
              {"\n\n            "}
            </div>
            {"\n          "}
          </div>
          {"\n        "}
        </div>
        {"\n\n      "}
      </div>
      {"\n    \n\n    "}
      <div className="footer-bottom">
        {"\n      "}
        <div className="container">
          {"\n        "}
          <div className="row align-items-center">
            {"\n          "}
            <div className="col-lg-6">
              {"\n            "}
              <div className="copyright">
                {"\n              "}
                <p>
                  {"© "}
                  <span>
                    {"Copyright 2026 "}
                  </span>
                  {" All Rights Reserved"}
                </p>
                {"\n            "}
              </div>
              {"\n          "}
            </div>
            {"\n        "}
          </div>
          {"\n      "}
        </div>
        {"\n    "}
      </div>
      {"\n\n  "}
    </footer>
  );
}

export function MessageUs({ visible }) {
  return (
    <a href="https://wa.me/2348158560940?text=Hello%20Olimpid%2C%20I%20would%20like%20to%20book%20a%20consultation." className="message-us" target="_blank" rel="noopener noreferrer" hidden={!visible}>
      {"\n  "}
      <i className="bi bi-chat-dots-fill" aria-hidden="true"></i>
      {"\n  "}
      <span>
        {"Message Us"}
      </span>
      {"\n"}
    </a>
  );
}

export function VideoModal() {
  return (
    <div id="videoModal" className="video-modal">
      {"\n  "}
      <div className="video-content">
        {"\n    "}
        <span className="close-btn" role="button" tabIndex="0" aria-label="Close video" data-action="close-video">
          {"\n      "}
          <i className="bi bi-x-lg"></i>
          {"\n    "}
        </span>
        {"\n\n    "}
        <video id="aboutVideo" controls preload="none">
          {"\n      "}
          <source src="/assets/video/olimpid video 1.mp4" type="video/mp4" />
          {"\n      Your browser does not support the video tag.\n    "}
        </video>
        {"\n  "}
      </div>
      {"\n"}
    </div>
  );
}
