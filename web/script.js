const InputIMG = new Image();
const OutputIMG = new Image();

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

    if (inputIMGSucceeded) {
        reader.readAsDataURL(file);
        console.log('AAA')
        const containerClass = document.querySelector('container');
        containerClass.style.display = 'none';
    }

}