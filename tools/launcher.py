import os
import sys
import shutil
import webbrowser


def bundle_dir():
    if getattr(sys, "frozen", False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))


def install_dir():
    base = os.environ.get("LOCALAPPDATA") or os.path.expanduser("~")
    return os.path.join(base, "TypingMaster")


def main():
    src = bundle_dir()
    dst = install_dir()
    os.makedirs(dst, exist_ok=True)

    for item in ("index.html", "css", "js", "assets"):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if not os.path.exists(s):
            continue
        if os.path.isdir(s):
            if os.path.exists(d):
                shutil.rmtree(d, ignore_errors=True)
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)

    index_path = os.path.join(dst, "index.html")
    url = "file:///" + index_path.replace(os.sep, "/")
    webbrowser.open(url)


if __name__ == "__main__":
    main()
