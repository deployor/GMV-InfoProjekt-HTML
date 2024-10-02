function checkPasswords() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const message = document.getElementById("message");
    
    if (password == "") {
      message.textContent = "Dein passwort kann nicht leer sein!";
      message.style.color = "#ff0000";
      return;
    }

    if (password === confirmPassword) {
      message.textContent = "Passwort erfolgreich zurückgesetzt!";
      message.style.color = "#00d312";
      setTimeout(() => {
        window.location.href = "OmisRezept/index.html";
      }, 1000);
    } else {
      message.textContent = "Die Passwörter stimmen nicht überein!";
      message.style.color = "#ff0000";
    }
  }