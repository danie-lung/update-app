function showToast(message, type) {

  const toastEl = document.getElementById('liveToast');
  const toastBody = document.getElementById('toastBody');

  toastBody.innerText = message;

  // Reset class
  toastEl.className = "toast align-items-center border-0";

  if (type === "success") {
    toastEl.classList.add("text-bg-success");
  } else if (type === "error") {
    toastEl.classList.add("text-bg-danger");
  } else {
    toastEl.classList.add("text-bg-primary");
  }

  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000
  });

  toast.show();
}

function cekKode(){

  let kode = document.getElementById("kode").value;
  let app = document.getElementById("app").value;

  let btn = document.getElementById("btnDownload");
  let loader = document.getElementById("loader");
  let btnText = document.getElementById("btnText");

  if(app === ""){
    showToast("Pilih aplikasi terlebih dahulu", "error");
    return;
  }

  if(kode === ""){
    showToast("Masukkan kode download", "error");
    return;
  }
  
  if(app === "dapodik"){
    showToast("Aplikasi belum tersedia", "error");
    return;
  }

  // Lock UI
  btn.disabled = true;
  loader.classList.remove("d-none");
  btnText.innerText = "Memproses...";

  fetch("https://script.google.com/macros/s/AKfycbxR4BkXbqeN2cBOh5klg2fCzMRzkvkAgdSb8acMnPtZSX8VQCRm3QwZqsmGiNQOW1QUdw/exec?kode=" + kode + "&app=" + app)
  .then(res => res.json())
  .then(data => {

    if(data.status === "ok"){

      showToast("Kode valid, sedang mengunduh...", "success");

      setTimeout(() => {
        window.location.href = data.link;
      }, 1200);

    } else {

      showToast(data.msg, "error");

      btn.disabled = false;
      loader.classList.add("d-none");
      btnText.innerText = "Download";

    }

  })
  .catch(() => {

    showToast("Server error", "error");

    btn.disabled = false;
    loader.classList.add("d-none");
    btnText.innerText = "Download";

  });

}
