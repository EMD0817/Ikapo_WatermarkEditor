const InputIMG = new Image();
const OutputIMG = new Image();
const containerClass = document.querySelector('.container');
const imgPreviewClass = document.querySelector('.imgPreview');
const footerClass = document.querySelector('.footer');
const previewImageID = document.querySelector('#previewImage');
let inputIMGSucceeded = false;
const watermarks = [
    "watermarks/W01.png",
    "watermarks/W02.png"
];
let fileName = '';

document.querySelector('.upload-button').addEventListener('click', function () {
    document.getElementById('imageUpload').click();
});

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    fileName = file.name.replace(/\.[^/.]+$/, ""); // ファイル名から拡張子を取り除く

    const reader = new FileReader();
    reader.onload = function (e) {
        InputIMG.onload = function () {
            inputIMGSucceeded = true;
            // Image is valid
            // You can now use InputIMG for further processing
            compositeWatermark(InputIMG, watermarks[0]).then((dataURL) => {
                OutputIMG.src = dataURL;
                previewImg(OutputIMG);
            });
            previewImg(OutputIMG);
        };
        InputIMG.onerror = function () {
            alert('有効な画像ファイルをアップロードしてください。');
        };
        InputIMG.src = e.target.result;
    };
    reader.readAsDataURL(file);
    containerClass.style.display = 'none';
    imgPreviewClass.style.display = 'flex';
    footerClass.style.display = 'flex';
}

function selectWatermark(id) {
    toggleSelectionBox(false);
    previewImageID.src = '';
    compositeWatermark(InputIMG, watermarks[id - 1]).then((dataURL) => {
        OutputIMG.src = dataURL;
        previewImg(OutputIMG);
    });
}

function selectDeliver(id) {
    // ファイル名を設定
    const baseFileName = (fileName === 'xxx') ? `Watermark_${fileName}` : fileName;
    let imageDataURL;

    // Canvasを作成し、OutputIMGを描画してデータURLを取得
    const canvas = document.createElement('canvas');
    canvas.width = OutputIMG.width;
    canvas.height = OutputIMG.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(OutputIMG, 0, 0);

    if (id === 'png') {
        // PNGファイルとして保存
        imageDataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = `${baseFileName}.png`;
        link.click();

    } else if (id === 'jpg') {
        // JPGファイルとして保存
        imageDataURL = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = `${baseFileName}.jpg`;
        link.click();

    } else if (id === 'x-post') {
        // Twitterに画像をツイート
        imageDataURL = canvas.toDataURL('image/png');
        const encodedImage = encodeURIComponent(imageDataURL);

        // TwitterのWeb Intent URLを生成
        const tweetText = "Check out this image!";
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodedImage}`;

        // 新しいタブで開く
        window.open(twitterUrl, '_blank');
    }
}


function toggleSelectionBox(show) {
    const selectionBox = document.querySelector('.selection-box');
    const overlay = document.querySelector('.overlay');

    if (show) {
        selectionBox.style.display = 'flex';
        overlay.style.display = 'block';
    } else {
        selectionBox.style.display = 'none';
        overlay.style.display = 'none';
    }
}

function toggleDeliverSelectionBox(show) {
    const selectionBox = document.querySelector('.deliver-selection-box');
    const overlay = document.querySelector('.overlay');

    if (show) {
        selectionBox.style.display = 'flex';
        overlay.style.display = 'block';
    } else {
        selectionBox.style.display = 'none';
        overlay.style.display = 'none';
    }
}

function compositeWatermark(input, watermarkPath) {
    return new Promise((resolve, reject) => {
        const watermark = new Image();
        watermark.src = watermarkPath;

        // 両方の画像がロードされた後に処理を行う
        watermark.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // キャンバスのサイズをinput画像に合わせる
            canvas.width = input.width;
            canvas.height = input.height;

            // input画像を描画
            ctx.drawImage(input, 0, 0, input.width, input.height);

            // watermark画像をinputに合わせてスケール調整
            const scale = Math.max(
                canvas.width / watermark.width,
                canvas.height / watermark.height
            );

            const watermarkWidth = watermark.width * scale;
            const watermarkHeight = watermark.height * scale;

            // 中央揃えでトリミングして描画
            const offsetX = (canvas.width - watermarkWidth) / 2;
            const offsetY = (canvas.height - watermarkHeight) / 2;

            ctx.drawImage(
                watermark,
                offsetX,
                offsetY,
                watermarkWidth,
                watermarkHeight
            );

            // 合成結果をデータURLとして返す
            resolve(canvas.toDataURL("image/png"));
        };

        watermark.onerror = () => {
            reject(new Error("Watermark image could not be loaded."));
        };
    });
}

function previewImg(img) {
    previewImageID.src = img.src;
}