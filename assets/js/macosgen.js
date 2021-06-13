
const BIG_SUR_WALLPAPER = 'https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-3840x2160-1455.jpg';

const TITLE_VERT_OFFSET = 105
const MAX_FONT_SIZE = 300
const LR_PADDING = 200

const FONTS = '-apple-system, \'Helvetica Neue\', sans-serif';

const EXAMPLES = [
    {
        'sysname': 'macOS',
        'vername': 'Sierra'
    },
    {
        'sysname': 'macOS',
        'vername': 'High Sierra'
    },
    {
        'sysname': 'macOS',
        'vername': 'Mojave'
    },
    {
        'sysname': 'macOS',
        'vername': 'Big Sur'
    },
    {
        'sysname': 'macOS',
        'vername': 'Monterey'
    },
    {
        'sysname': 'macOS',
        'vername': 'Mammoth'
    },
    {
        'sysname': 'macOS',
        'vername': 'Mendota'
    },
    {
        'sysname': 'macOS',
        'vername': 'Weed'
    },
    {
        'sysname': 'macOS',
        'vername': 'Bigger Sur'
    },
    {
        'sysname': 'macOS',
        'vername': 'Biggest Sur'
    },
    {
        'sysname': 'macOS',
        'vername': 'Large Gentleman'
    },
    {
        'sysname': 'donaldOS',
        'vername': 'Big Mac'
    },
    {
        'sysname': 'windOS',
        'vername': 'Ten'
    }
]

function selectRandomExample() {
    const example = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)]
    document.getElementById('macosName').value = example.sysname;
    document.getElementById('versionName').value = example.vername;
}

function getNewFontSize(text_width, total_width, padding, original_font_size) {
    return (original_font_size / text_width) * (total_width - 2 * padding)
}

function buildObjAndDraw() {
    let img = document.getElementById('backgroundImage');

    let transparentBG = document.getElementById('transparentBackground').checked;
    let url = '';
    if (!transparentBG && img.files && img.files[0]) {
        url = URL.createObjectURL(img.files[0]);
        console.log(url);
    }

    let obj = {
        'sysname': document.getElementById('macosName').value,
        'vername': document.getElementById('versionName').value,
        'bg': url
    };

    predraw(obj);
}

function predraw(obj) {
    if (obj.bg == '' || obj.bg == null) {
        draw(obj, null, null);
        return;
    }

    const image = new Image();

    image.onload = (event) => draw(obj, event, image);
    image.crossOrigin = 'anonymous';
    image.src = obj.bg;
}

function draw(obj, event, image) {
    // create canvas
    let newCanvas = document.createElement('canvas');
    newCanvas.className = 'w-100';
    newCanvas.width = 1920;
    newCanvas.height = 1080;

    let ctx = newCanvas.getContext('2d');

    // Draw image
    if (image != null) ctx.drawImage(image, 0, 0, 1920, 1080);

    // Determine width of text
    ctx.fillStyle = '#ffffff';
    ctx.font = `500 ${MAX_FONT_SIZE}px ${FONTS}`;

    let origWidth = ctx.measureText(obj.vername).width;
    console.log(`width for ${obj.vername} is ${origWidth}`)

    // If measurements is greater than 1920 - (LR_PADDING / 2), then shrink
    // it until we have the padding
    let maximumWidth = 1920 - LR_PADDING * 2;

    let effectiveSize = MAX_FONT_SIZE;

    if (origWidth > maximumWidth) {
        console.log(`Too big!`);

        let tooBigBy = origWidth - maximumWidth;

        console.log(`Too big by ${tooBigBy}`);

        // We'd need to decrease the width by tooBigBy so that it fits
        effectiveSize = getNewFontSize(origWidth, 1920, LR_PADDING, MAX_FONT_SIZE);

        ctx.font = `500 ${effectiveSize}px ${FONTS}`;
    }

    ctx.textAlign = 'center';
    ctx.fillText(obj.vername, 1920 / 2, 1080 / 2 + TITLE_VERT_OFFSET);


    // Draw macOS
    ctx.font = `500 80px -apple-system, ${FONTS}`;
    ctx.fillText(obj.sysname, 1920 / 2, 1080 / 2 - effectiveSize / 2);

    let img = newCanvas.toDataURL('image/png');
    let imgElement = document.getElementById('output');
    imgElement.src = img;

}

selectRandomExample()
buildObjAndDraw()