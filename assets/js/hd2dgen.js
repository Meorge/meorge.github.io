var rows = [];

const MIN_WIDTH = 1920;
const MIN_HEIGHT = 1080;

const OFFSET_TO_WORDS = 540;
const WORD_OFFSET = 150;
const BOTTOM_PADDING = 240;

const projectTextBox = document.getElementById('projectName');
const rowContainer = document.getElementById('rowContainer');

function deleteRow(rowObj) {
    rowContainer.removeChild(rowObj.row);
    rows.splice(rows.indexOf(rowObj), 1);
}

function addRow(text) {
    // Adds a new row to the UI so you can type more words.

    // Create row div
    let newRow = document.createElement('div');
    newRow.className = 'input-group mb-3';

    // Create text box for row
    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'form-control';
    newInput.id = 'rowInput';
    newInput.value = text;
    newRow.appendChild(newInput);


    // Create delete button for row
    let newDelButton = document.createElement('button');
    newDelButton.type = 'button';
    newDelButton.className = 'btn btn-danger';
    newDelButton.innerHTML = '<i class="bi bi-x-lg"></i>';

    // Store both the row itself and its text box
    let rowObj = {
        'row': newRow,
        'input': newInput
    }

    // Delete row when its delete button is clicked
    newDelButton.onclick = () => deleteRow(rowObj);
    newRow.appendChild(newDelButton);

    // Add row to collection
    rows.push(rowObj);
    rowContainer.appendChild(newRow);
}

function calculateDimensions() {
    // Calculate the minimum width and height for this image
    return OFFSET_TO_WORDS + (WORD_OFFSET * rows.length) + BOTTOM_PADDING;
}

function buildObjAndDraw() {
    // get the row text
    let rowTexts = rows.map((rowObj) => {
        return rowObj.input.value;
    });
    
    let obj = {
        'foregroundColor': document.getElementById('textColor').value,
        'backgroundColor': document.getElementById('backgroundColor').value,
        'transparentBackground': document.getElementById('transparentBackground').checked,
        'project': document.getElementById('projectName').value,
        'rows': rowTexts
    };

    draw(obj);
}

function draw(obj) {
    calculateDimensions();

    // Create the canvas - width is always 1920
    // height depends on the number of rows
    let newCanvas = document.createElement('canvas');
    newCanvas.className = 'w-100'
    newCanvas.width = 1920;
    newCanvas.height = calculateDimensions();
    let ctx = newCanvas.getContext('2d');

    // If background isn't transparent, draw it
    if (!obj.transparentBackground) {
        ctx.fillStyle = obj.backgroundColor;
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
    }

    ctx.fillStyle = obj.foregroundColor;
    ctx.font = '160px \'Cardo\'';

    let offset = 0;

    // Determine the width of the larget row of text
    let largestWidth = 0;
    obj.rows.forEach(text => {
        let metrics = ctx.measureText(text);
        if (metrics.width > largestWidth) {
            largestWidth = metrics.width;
        }
    });

    obj.rows.forEach(text => {
        drawSingleRow(ctx, text, offset, largestWidth);

        offset += WORD_OFFSET;
    });

    // Draw "project"
    ctx.font = '60px \'Cardo\'';
    ctx.textAlign = 'start';
    ctx.fillText(obj.project, 1920 / 2 - largestWidth / 2, 390);

    let img = newCanvas.toDataURL('image/png');
    let imgElement = document.getElementById('output');
    imgElement.src = img;
}

function drawSingleRow(ctx, text, offset, largestWidth) {
    // Draw the row text, centered
    ctx.textAlign = 'center';

    let centerX = 1920 / 2;
    let halfWidth = largestWidth / 2;

    let baseY = OFFSET_TO_WORDS + offset;
    let lineY = baseY + 15;
    ctx.fillText(text, centerX, baseY);
    
    // Underneath we need to draw the line with width largestWidth
    ctx.strokeStyle = document.getElementById('textColor').value;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(centerX - halfWidth, lineY);
    ctx.lineTo(centerX + halfWidth, lineY);
    ctx.closePath();
    ctx.stroke();

}

addRow("TRIANGLE");
addRow("STRATEGY");