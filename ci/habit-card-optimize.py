from io import BytesIO
from urllib.request import urlopen
from PIL import Image, ImageOps
import base64, hashlib
url="https://raw.githubusercontent.com/Soldatix/Habit-Tracker-Daily-Planner/main/public/habit-tracker-cover.png"
source=urlopen(url,timeout=25).read()
with Image.open(BytesIO(source)) as original:
    img=ImageOps.fit(original.convert("RGB"), (768, 432), method=Image.Resampling.LANCZOS, centering=(.5,.5))
    out=BytesIO()
    img.save(out,format="WEBP",quality=74,method=6)
data=out.getvalue()
assert data[:4]==b"RIFF" and data[8:12]==b"WEBP"
print("HABIT_WEBP_BYTES="+str(len(data)),flush=True)
print("HABIT_WEBP_SHA256="+hashlib.sha256(data).hexdigest(),flush=True)
encoded=base64.b64encode(data).decode("ascii")
for offset in range(0,len(encoded),3000):
    print("HABIT_WEBP_CHUNK_"+str(offset//3000).zfill(4)+"="+encoded[offset:offset+3000],flush=True)
