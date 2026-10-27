import os
import sys
import shutil
import subprocess
import webbrowser


def bundle_dir():
    if getattr(sys, "frozen", False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))


def install_dir():
    base = os.environ.get("LOCALAPPDATA") or os.path.expanduser("~")
    return os.path.join(base, "TypingMaster")


def alert(message):
    """--noconsole builds have no stdout, so errors must be a dialog."""
    try:
        import ctypes
        ctypes.windll.user32.MessageBoxW(None, message, "Typing Master Installer", 0x10)
    except Exception:
        pass
    sys.exit(1)


def copy_item(src_root, dst_root, item):
    s = os.path.join(src_root, item)
    d = os.path.join(dst_root, item)
    if not os.path.exists(s):
        return False
    if os.path.isdir(s):
        if os.path.exists(d):
            shutil.rmtree(d, ignore_errors=True)
        shutil.copytree(s, d)
    else:
        shutil.copy2(s, d)
    return True


def write_runner(dst, index_path):
    """A tiny .bat that opens the installed copy in the default browser,
    so shortcuts have something durable to point at (file paths can contain
    spaces, and shortcuts to .url/.html files lose query strings)."""
    url = "file:///" + index_path.replace(os.sep, "/") + "?desktop=1"
    bat = os.path.join(dst, "TypingMaster.bat")
    with open(bat, "w", newline="\r\n") as f:
        f.write("@echo off\r\n")
        f.write('start "" "' + url + '"\r\n')
    return bat


def make_shortcuts(dst, bat_path, ico_path):
    """Start Menu and Desktop shortcuts via a small PowerShell script, so the
    installer needs no third-party packages."""
    def q(s):
        return s.replace("'", "''")
    ps = (
        "$ws = New-Object -ComObject WScript.Shell; "
        "$programs = [Environment]::GetFolderPath('Programs'); "
        "$desktop = [Environment]::GetFolderPath('Desktop'); "
        "$targets = @($programs, $desktop); "
        "foreach ($t in $targets) { "
        "if (-not (Test-Path $t)) { continue }; "
        "$lnk = $ws.CreateShortcut((Join-Path $t 'Typing Master.lnk')); "
        "$lnk.TargetPath = '" + q(bat_path) + "'; "
        "$lnk.WorkingDirectory = '" + q(dst) + "'; "
        "$lnk.Description = 'Typing Master - touch typing lessons'; "
        "if (Test-Path '" + q(ico_path) + "') { $lnk.IconLocation = '" + q(ico_path) + "' }; "
        "$lnk.WindowStyle = 7; "
        "$lnk.Save(); "
        "}"
    )
    try:
        subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", ps],
            check=False, capture_output=True, timeout=60,
        )
    except Exception:
        pass


def main():
    src = bundle_dir()
    dst = install_dir()

    index_path = os.path.join(src, "index.html")
    if not os.path.exists(index_path):
        alert("The installation files are missing. The download appears to be "
              "incomplete — please download Typing Master again.")
        return

    os.makedirs(dst, exist_ok=True)
    for item in ("index.html", "css", "js", "assets", "icon.ico"):
        copy_item(src, dst, item)

    bat_path = write_runner(dst, index_path)
    make_shortcuts(dst, bat_path, os.path.join(dst, "icon.ico"))

    url = "file:///" + index_path.replace(os.sep, "/") + "?desktop=1"
    webbrowser.open(url)


if __name__ == "__main__":
    main()
