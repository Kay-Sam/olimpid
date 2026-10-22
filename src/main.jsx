import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./app.jsx";

const root = document.getElementById("root");

if (import.meta.env.DEV) {
  createRoot(root).render(<App path={window.location.pathname} />);
} else {
  hydrateRoot(root, <App path={window.location.pathname} />);
}
