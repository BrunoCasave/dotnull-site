const note = document.getElementById("form-note");
const mailtoLink = document.getElementById("contact-mailto");
const emailText = document.getElementById("contact-email");
const copyButton = document.getElementById("copy-email");

function setNote(message) {
  if (!note) return;
  note.textContent = message;
}

// TODO: 実際の宛先に合わせて変更してください
const CONTACT_EMAIL_USER = "info";
const CONTACT_EMAIL_DOMAIN = "dotnull.co.jp";
const CONTACT_EMAIL = `${CONTACT_EMAIL_USER}@${CONTACT_EMAIL_DOMAIN}`;

const SUBJECT = "お問い合わせ（株式会社どっとぬる）";
const BODY = ["お名前：", "ご連絡先メール：", "お問い合わせ内容：", "", "—", ""].join("\n");

if (mailtoLink) {
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    SUBJECT
  )}&body=${encodeURIComponent(BODY)}`;
  mailtoLink.setAttribute("href", href);
}

if (emailText) {
  emailText.textContent = CONTACT_EMAIL;
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setNote("メールアドレスをコピーしました。");
    } catch {
      setNote("コピーに失敗しました。手動で選択してコピーしてください。");
    }
  });
}
