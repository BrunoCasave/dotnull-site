const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");

function setNote(message) {
  if (!note) return;
  note.textContent = message;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    const action = form.getAttribute("action") || "";

    if (!action || action === "#") {
      event.preventDefault();
      setNote(
        "このサイトはGitHub Pages用の静的サイトです。フォーム送信先（action）を設定してください。"
      );
      return;
    }

    const isSameOrigin = (() => {
      try {
        const target = new URL(action, window.location.href);
        return target.origin === window.location.origin;
      } catch {
        return false;
      }
    })();

    if (!isSameOrigin) {
      return;
    }

    event.preventDefault();

    try {
      const response = await fetch(action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        setNote("送信に失敗しました。時間をおいて再度お試しください。");
        return;
      }

      form.reset();
      setNote("送信しました。ありがとうございました。");
    } catch {
      setNote("送信に失敗しました。時間をおいて再度お試しください。");
    }
  });
}

