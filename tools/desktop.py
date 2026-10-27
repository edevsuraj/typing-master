import os, sys
import webview

def bundle_dir():
    if getattr(sys, "frozen", False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

def main():
    base = bundle_dir()
    # When frozen the web files sit in MEIPASS; fall back to the project root
    # so the same script also works straight from the repository.
    index = os.path.join(base, "index.html")
    if not os.path.exists(index):
        index = os.path.join(os.path.dirname(base), "index.html")
    if not os.path.exists(index):
        sys.exit("index.html not found next to the Typing Master executable")

    # The ?desktop=1 flag lets the page know it is running inside the
    # bundled window (it hides browser-only furniture such as the download
    # button and the reload button).
    webview.create_window(
        "Typing Master",
        index + "?desktop=1",
        width=1200,
        height=800,
        min_size=(980, 640),
        text_select=True,
    )
    # Windows 10/11 ship WebView2, so EdgeChromium is the expected back-end;
    # fall back to whatever else pywebview can find if it is unavailable.
    try:
        webview.start(gui="edgechromium")
    except Exception:
        webview.start()

if __name__ == "__main__":
    main()
