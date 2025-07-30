document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.addEventListener("click", function () {
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    const isChecked = document.getElementById("exampleCheck1").checked;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    alert(
      `Email: ${email}\nPassword: ${password}\nRemember: ${isChecked ? "Yes" : "No"}`
    );

    const modalEl = document.getElementById("loginModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
  });
});








document.querySelectorAll("#copyBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    navigator.clipboard.writeText("Copied.").then(() => {
      
      btn.classList.add("copied");

      
      setTimeout(() => {
        btn.classList.remove("copied");
      }, 1500);

     
      showCustomAlert("The text has been copied.");
    });
  });
});

function showCustomAlert(message = "Copied!") {
  const alert = document.getElementById("customAlert");
  alert.querySelector(".alert-body p").textContent = message;
  alert.style.display = "block";

  setTimeout(() => {
    alert.classList.add("show");
  }, 10);

  const okBtn = document.getElementById("okBtn");
  okBtn.onclick = function () {
    alert.classList.remove("show");
    setTimeout(() => {
      alert.style.display = "none";
    }, 500);
  };
}























