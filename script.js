const wrapper = document.querySelector(".wrapper"),
  qrinput = wrapper.querySelector(".form input"),
  generareBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img"),
  btndownload = wrapper.querySelector(".btn-download");

generareBtn.addEventListener("click", () => {
  let qrValue = qrinput.value;
  generareBtn.innerText = "Process Generate...";

  if (!qrValue) return;
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generareBtn.innerText = "Generate QR Code";
  });
});

btndownload.addEventListener("click", () => {
  fetchFile(qrImg.src);
});

function fetchFile(url) {
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl;
      document.body.appendChild(aTag);
      aTag.click();
    });
}
