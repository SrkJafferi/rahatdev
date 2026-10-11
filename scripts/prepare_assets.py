from pathlib import Path
from PIL import Image
import shutil, subprocess, json

root=Path(__file__).resolve().parents[1]
dest=root/'public/media'; dest.mkdir(parents=True,exist_ok=True)
sources={
 'smart-one-exterior.webp':'Smart One Hight re size (1)/p1-i1.jpg',
 'rahat-heights-exterior.webp':'Brochure/p3-i2.jpg',
 'rahat-heights-detail.webp':'Brochure/p3-i1.jpg',
 'rahat-heights-ii-exterior.webp':'Brochure RH2 PLOT # 11 final/p2-i1.jpg',
 'rahat-heights-ii-detail.webp':'Brochure RH2 PLOT # 11 final/p4-i2.jpg',
}
for name,source in sources.items():
    Image.open(root/'tmp/reference'/source).convert('RGB').save(dest/name,'WEBP',quality=90)
shutil.copyfile(root/'reference/logo.png',dest/'logo.png')
docs=root/'public/brochures'; docs.mkdir(exist_ok=True)
for slug,pdf,page in [('rahat-heights','Brochure.pdf',9),('smart-one-heights-2','Smart One Hight re size (1).pdf',6),('rahat-heights-ii','Brochure RH2 PLOT # 11 final.pdf',10)]:
    shutil.copyfile(root/'reference'/pdf,docs/f'{slug}.pdf')
    target=root/'tmp/reference'/f'{slug}-plan'
    subprocess.run(['pdftoppm','-f',str(page),'-l',str(page),'-singlefile','-scale-to','1800','-png',str(root/'reference'/pdf),str(target)],check=True)
    Image.open(str(target)+'.png').convert('RGB').save(dest/f'{slug}-plan.webp','WEBP',quality=90)
print('Prepared 9 project assets, original logo, and 3 unchanged brochures.')
