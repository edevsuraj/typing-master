import os, sys
import webview

def bundle_dir():
    if getattr(sys, "frozen", False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

if __name__ == "__main__":
    base = bundle_dir()
    # When frozen, web files are in MEIPASS; use index.html there
    index = os.path.join(base, "index.html")
    # If not frozen, use project root
    if not os.path.exists(index):
        index = os.path.join(os.path.dirname(base), "index.html")
    webview.create_window("Typing Master", index + "?desktop=1", width=1200, height=800)
    webview.start()
