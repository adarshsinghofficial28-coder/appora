"""
Appora local dev server.

Mirrors the rewrites in vercel.json so clean URLs
(/browse, /home, /app/linear, /repositories, ...) work locally exactly as on Vercel.
Any route that doesn't match a real file is auto-resolved to "<path>.html".

Usage:
    python serve.py            # http://localhost:8000
    python serve.py 5500       # custom port
"""
import http.server
import os
import sys
from urllib.parse import unquote

ROOT = os.path.dirname(os.path.abspath(__file__))
DEFAULT_PORT = 8000

# Keep in sync with vercel.json rewrites.
REWRITES = {
    "/": "index.html",
    "/home": "index.html",
    "/browse": "browse.html",
    "/pricing": "pricing.html",
    "/dashboard": "dashboard.html",
    "/admin": "admin-panel.html",
    "/login": "login.html",
    "/signup": "signup.html",
    "/welcome": "welcome.html",
    "/repositories": "repositories.html",
    "/directory": "directory.html",
    "/search": "search.html",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        path = unquote(path)
        # /app/<name> -> app-detail.html?name=<name> (query preserved by caller)
        if path.startswith("/app/"):
            return os.path.join(ROOT, "app-detail.html")
        # Exact clean-url rewrite
        if path in REWRITES:
            return os.path.join(ROOT, REWRITES[path])
        # Auto-resolve any clean route to <path>.html (e.g. /repositories -> repositories.html)
        filename = os.path.join(ROOT, path.lstrip("/"))
        if not os.path.isfile(filename) and os.path.isfile(filename + ".html"):
            return filename + ".html"
        return super().translate_path(path)

    def do_GET(self):
        raw = self.path.split("?", 1)[0]
        if raw in REWRITES or raw.startswith("/app/"):
            # rewrite is handled in translate_path; keep the query string
            return super().do_GET()
        return super().do_GET()

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("[serve] %s\n" % (fmt % args))


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print("Appora dev server: http://127.0.0.1:%d" % port)
    print("Try: http://127.0.0.1:%d/browse" % port)
    print("     http://127.0.0.1:%d/repositories" % port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
