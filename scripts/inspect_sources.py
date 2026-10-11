from pathlib import Path
from pypdf import PdfReader
from PIL import Image, ImageOps, ImageDraw
import openpyxl, json, subprocess

root = Path(__file__).resolve().parents[1]
out = root / 'tmp/reference'
out.mkdir(parents=True, exist_ok=True)
manifest = []
for i, path in enumerate(sorted((root/'reference').rglob('*'))):
    if not path.is_file(): continue
    item = {'file': str(path.relative_to(root)), 'bytes': path.stat().st_size}
    if path.suffix == '.pdf':
        doc = PdfReader(path)
        item['pages'] = len(doc.pages)
        texts = []
        images = []
        folder = out / path.stem
        folder.mkdir(exist_ok=True)
        for n, page in enumerate(doc.pages):
            texts.append(f'PAGE {n+1}\n{page.extract_text()}')
            for j, img in enumerate(page.images):
                p = folder / f'p{n+1}-i{j+1}{Path(img.name).suffix}'
                p.write_bytes(img.data)
                images.append({'file':str(p.relative_to(root)), 'size':img.image.size})
        (folder/'text.txt').write_text('\n\n'.join(texts),encoding='utf-8')
        item['images'] = images
        subprocess.run(['pdftoppm','-jpeg','-scale-to','900',str(path),str(folder/'page')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        thumbs = []
        for p in sorted(folder.glob('page-*.jpg')):
            im = Image.open(p).convert('RGB'); im.thumbnail((420,420))
            tile = Image.new('RGB',(440,460),'#eeeeee'); tile.paste(im,((440-im.width)//2,15))
            ImageDraw.Draw(tile).text((12,437),p.name,fill='black'); thumbs.append(tile)
        sheet = Image.new('RGB',(440*min(4,len(thumbs)),460*((len(thumbs)+3)//4)),'white')
        for j,im in enumerate(thumbs): sheet.paste(im,((j%4)*440,(j//4)*460))
        sheet.save(out/f'contact-{i}.jpg')
    elif path.suffix == '.xlsx':
        wb = openpyxl.load_workbook(path,data_only=True)
        item['sheets']={s.title:[{'row':n,'values':list(row)} for n,row in enumerate(s.values,1) if any(v is not None for v in row)] for s in wb}
    manifest.append(item)
(out/'manifest.json').write_text(json.dumps(manifest,indent=2,default=str),encoding='utf-8')
print(json.dumps([{k:v for k,v in x.items() if k!='images'} for x in manifest],indent=2,default=str))
