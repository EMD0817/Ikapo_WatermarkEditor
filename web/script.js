const InputIMG = new Image();
const OutputIMG = new Image();
const containerClass = document.querySelector('.container');
const imgPreviewClass = document.querySelector('.imgPreview');
const footerClass = document.querySelector('.footer');
const previewImageID = document.querySelector('#previewImage');

document.querySelector('.upload-button').addEventListener('click', function () {
    document.getElementById('imageUpload').click();
});

function handleImageUpload(event) {
    let inputIMGSucceeded = true;
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        InputIMG.onload = function () {
            // Image is valid
            // You can now use InputIMG for further processing
        };
        InputIMG.onerror = function () {
            inputIMGSucceeded = false;
            alert('有効な画像ファイルをアップロードしてください。');
        };
        InputIMG.src = e.target.result;
    };

    reader.readAsDataURL(file);

    OutputIMG.src = InputIMG.src;
    previewImg(OutputIMG);

    containerClass.style.display = 'none';
    imgPreviewClass.style.display = 'flex';
    footerClass.style.display = 'flex';
}

function previewImg(img) {
    previewImageID.src = img.src;
}