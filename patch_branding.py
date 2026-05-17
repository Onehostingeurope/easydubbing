"""
Easy Dubbing - Branding Patch for pyvideotrans
Removes Donate and Help Docs buttons, rebrands title.
Run once after git clone.
"""
import os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
TARGET = os.path.join(ROOT, "videotrans", "mainwin", "_main_win.py")

if not os.path.exists(TARGET):
    print(f"[FAIL] File not found: {TARGET}")
    sys.exit(1)

with open(TARGET, "r", encoding="utf-8") as f:
    src = f.read()

original = src

# 1. Rebrand window title — replace the entire rawtitle line safely
lines = src.splitlines(keepends=True)
new_lines = []
for line in lines:
    if "self.rawtitle" in line and "setWindowTitle" not in line:
        indent = len(line) - len(line.lstrip())
        new_lines.append(" " * indent + 'self.rawtitle = "Easy Dubbing"\n')
    else:
        new_lines.append(line)
src = "".join(new_lines)

# 2. Hide the Help Docs button (statusLabel)
src = src.replace(
    'self.statusLabel = QPushButton(tr("Open Documents"))',
    'self.statusLabel = QPushButton("")'
)
src = src.replace(
    'self.statusBar.addWidget(self.statusLabel)',
    'self.statusLabel.hide()\n        self.statusBar.addWidget(self.statusLabel)'
)

# 3. Hide the Donate button (rightbottom)
src = src.replace(
    "self.rightbottom = QPushButton(tr('juanzhu'))",
    "self.rightbottom = QPushButton('')"
)
# Hide it after it's added to container
src = src.replace(
    'self.container.addWidget(self.rightbottom)',
    'self.rightbottom.hide()\n        self.container.addWidget(self.rightbottom)'
)

if src == original:
    print("[WARN] No changes made to _main_win.py — may already be patched.")
else:
    with open(TARGET, "w", encoding="utf-8") as f:
        f.write(src)
    print("[OK] _main_win.py patched: title, Help Docs, Donate hidden.")

# ── Patch sp.py (splash screen) ────────────────────────────────
SP = os.path.join(ROOT, "sp.py")
if os.path.exists(SP):
    with open(SP, "r", encoding="utf-8") as f:
        sp = f.read()
    sp_orig = sp
    sp = sp.replace("self.setWindowTitle('pyVideoTrans')", "self.setWindowTitle('Easy Dubbing')")
    sp = sp.replace('f"pyVideoTrans {VERSION} Loading..."', 'f"Easy Dubbing {VERSION} Loading..."')
    if sp != sp_orig:
        with open(SP, "w", encoding="utf-8") as f:
            f.write(sp)
        print("[OK] sp.py patched: splash title and loading text.")
    else:
        print("[WARN] sp.py - no changes (may already be patched).")

# ── Replace splash logo ─────────────────────────────────────────
LOGO_SRC  = os.path.join(ROOT, "easy_dubbing_logo.png")
LOGO_DEST = os.path.join(ROOT, "videotrans", "styles", "logo.png")
if os.path.exists(LOGO_SRC):
    import shutil
    shutil.copy2(LOGO_SRC, LOGO_DEST)
    print("[OK] logo.png replaced with Easy Dubbing splash image.")
else:
    print("[WARN] easy_dubbing_logo.png not found — logo not replaced.")
