import { renderToString } from "react-dom/server";
import { App } from "./app.jsx";

export function renderPage(path) {
  return renderToString(<App path={path} />);
}
