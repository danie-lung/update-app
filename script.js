function cekKode(){

  let kode = document.getElementById("kode").value;
  let app = document.getElementById("app").value;

  let msg = document.getElementById("msg");
  let btn = document.getElementById("btnDownload");
  let loader = document.getElementById("loader");
  let btnText = document.getElementById("btnText");

  if(app === ""){
    msg.className = "text-danger fw-semibold mt-3";
    msg.innerText = "Pilih aplikasi terlebih dahulu";
    return;
  }

  if(kode === ""){
    msg.className = "text-danger fw-semibold mt-3";
    msg.innerText = "Masukkan kode download";
    return;
  }

  // Lock UI
  btn.disabled = true;
  loader.classList.remove("d-none");
  btnText.innerText = "Memproses...";
  msg.innerText = "";

  // Kirim ke API GAS
  fetch("https://script.google.com/macros/s/AKfycbxD1UP6VgYXftX7ChF7f41w6-hUNdLH9VcSPV1RSiaLwrbtEinZk65Lqppz8qygMqzGPQ/exec?kode=" + kode + "&app=" + app)
  .then(res => res.json())
  .then(data => {

    if(data.status === "ok"){

      msg.className = "text-success fw-semibold mt-3";
      msg.innerText = "Kode valid ✅ Mengunduh...";

      setTimeout(() => {
        window.location.href = data.link;
      }, 1200);

    } else {

      msg.className = "text-danger fw-semibold mt-3";
      msg.innerText = data.msg;

      // Unlock UI
      btn.disabled = false;
      loader.classList.add("d-none");
      btnText.innerText = "Download";

    }

  })
  .catch(() => {

    msg.className = "text-danger fw-semibold mt-3";
    msg.innerText = "Server error";

    btn.disabled = false;
    loader.classList.add("d-none");
    btnText.innerText = "Download";

  });

}
