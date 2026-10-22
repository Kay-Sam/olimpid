import { useEffect, useState } from "react";
import { Footer, MessageUs, VideoModal } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { DestinationsPage } from "./pages/DestinationsPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProgramsPage } from "./pages/ProgramsPage.jsx";
import "./styles.css";

const pages = {
  "/": HomePage,
  "/about": AboutPage,
  "/programs": ProgramsPage,
  "/destinations": DestinationsPage,
  "/contact": ContactPage,
};

function getRoute(path) {
  return pages[path] ? path : "/";
}

function closeVideo() {
  const modal = document.querySelector("#videoModal");
  const video = document.querySelector("#aboutVideo");
  if (!modal || !video) return;
  modal.style.display = "none";
  video.pause();
  video.currentTime = 0;
}

function submitWhatsAppForm(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || form.id !== "whatsappForm") return;
  event.preventDefault();

  const values = new FormData(form);
  const text = `Hello Olimpid, These are my details from the website:

Full Name: ${values.get("fullName") ?? ""}
Email: ${values.get("email") ?? ""}
Phone: ${values.get("phone") ?? ""}
Destination: ${values.get("country") ?? ""}
Program: ${values.get("program") ?? ""}
Additional Info: ${values.get("message") ?? ""}`;

  window.open(
    `https://wa.me/2348158560940?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

export function App({ path = "/" }) {
  const route = getRoute(path);
  const Page = pages[route];
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageUsVisible, setMessageUsVisible] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-active", menuOpen);
    return () => document.body.classList.remove("mobile-nav-active");
  }, [menuOpen]);

  useEffect(() => {
    const body = document.body;
    const sectionsToHideMessageUs = document.querySelectorAll(".hero, .page-title, #footer");
    const updateViewportState = () => {
      body.classList.toggle("scrolled", window.scrollY > 100);
      const overlapsSection = Array.from(sectionsToHideMessageUs).some((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < window.innerHeight;
      });
      setMessageUsVisible(!overlapsSection);
    };
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      closeVideo();
    };

    updateViewportState();
    window.addEventListener("scroll", updateViewportState, { passive: true });
    window.addEventListener("resize", updateViewportState);
    document.addEventListener("keydown", handleKeyDown);

    const slider = document.querySelector(".testimonials-home .swiper-wrapper");
    const slides = slider ? Array.from(slider.children) : [];
    const pagination = document.querySelector(".testimonials-home .swiper-pagination");
    let activeSlide = 0;
    let autoplay;

    const showSlide = (index) => {
      if (!slider || slides.length === 0) return;
      activeSlide = (index + slides.length) % slides.length;
      slider.style.transform = `translate3d(-${activeSlide * 100}%, 0, 0)`;
      pagination?.querySelectorAll("button").forEach((button, buttonIndex) => {
        button.classList.toggle("swiper-pagination-bullet-active", buttonIndex === activeSlide);
        button.setAttribute("aria-current", buttonIndex === activeSlide ? "true" : "false");
      });
    };

    if (pagination && slides.length > 0) {
      pagination.replaceChildren(...slides.map((_, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "swiper-pagination-bullet";
        button.setAttribute("aria-label", `Show testimonial ${index + 1}`);
        button.addEventListener("click", () => showSlide(index));
        return button;
      }));
      showSlide(0);
      autoplay = window.setInterval(() => showSlide(activeSlide + 1), 5000);
      pagination.addEventListener("focusin", () => window.clearInterval(autoplay), { once: true });
    }

    return () => {
      body.classList.remove("mobile-nav-active");
      window.removeEventListener("scroll", updateViewportState);
      window.removeEventListener("resize", updateViewportState);
      document.removeEventListener("keydown", handleKeyDown);
      window.clearInterval(autoplay);
    };
  }, [route]);

  const handleClick = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    if (target.closest(".mobile-nav-toggle")) {
      setMenuOpen((open) => !open);
    } else if (target.closest("#navmenu a")) {
      setMenuOpen(false);
    } else if (target.closest('[data-action="open-video"]')) {
      const modal = document.querySelector("#videoModal");
      const video = document.querySelector("#aboutVideo");
      if (modal && video) {
        modal.style.display = "flex";
        video.play().catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Could not play the introduction video.", error);
          }
        });
      }
    } else if (target.closest('[data-action="close-video"]')) {
      closeVideo();
    }
  };

  const handleKeyDown = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (
      target &&
      (event.key === "Enter" || event.key === " ") &&
      target.matches('[data-action="open-video"], [data-action="close-video"]')
    ) {
      event.preventDefault();
      target.click();
    }
  };

  return (
    <div id="site" onClick={handleClick} onKeyDown={handleKeyDown} onSubmit={submitWhatsAppForm}>
      <Header route={route} menuOpen={menuOpen} />
      <Page />
      <Footer />
      {(route === "/" || route === "/about") && <VideoModal />}
      <MessageUs visible={messageUsVisible} />
    </div>
  );
}
