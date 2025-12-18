# dotnull-site (GitHub Pages)

GitHub Pages で公開するための、シンプルな静的コーポレートサイトです（`index.html` + `styles.css`）。

## できること / できないこと

- できます: 無料ホスティング、HTTPS、自動デプロイ、独自ドメイン
- できません: サーバーサイド処理（PHP/DB など）
  - お問い合わせフォーム送信は、外部サービス（例: Formspree など）または別途 API が必要です

## 公開（GitHub Pages）

1. このフォルダを GitHub に新規リポジトリとして push（例: `dotnull-site`）
2. GitHub でリポジトリを開く
3. `Settings` → `Pages`
4. `Build and deployment` → `Source` を `Deploy from a branch`
5. `Branch` を `main` / `/(root)` にして `Save`

数十秒〜数分で `https://<GitHubユーザー名>.github.io/<リポジトリ名>/` で表示されます。

## 先にプレビューしたい（独自ドメイン設定前）

このリポジトリには独自ドメイン用の `CNAME` を同梱しています。独自ドメイン設定前に `github.io` 側のURLで確認したい場合は、一時的に `CNAME` を外して push してください。

例:

```bash
git rm CNAME
git commit -m "Temporarily remove CNAME for preview"
git push
```

確認できたら `CNAME` を戻して push し、GitHub の `Settings` → `Pages` で `Custom domain` を設定します。

## 独自ドメイン（dotnull.co.jp）

### 1) GitHub 側

1. `Settings` → `Pages`
2. `Custom domain` に `dotnull.co.jp` を入力して保存
3. `Enforce HTTPS` を ON（証明書の発行に時間がかかることがあります）

補足: このリポジトリには `CNAME` を同梱しています（`dotnull.co.jp`）。別ドメインにする場合は `CNAME` を書き換えてください。

### 2) DNS 側（ドメイン管理サービス側）

`dotnull.co.jp` を GitHub Pages に向けます。

- ルートドメイン（`dotnull.co.jp`）を使う場合: A レコードを GitHub に向けます
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `www` も使う場合: `www` の CNAME を `<GitHubユーザー名>.github.io` に向けます

DNS 設定後、反映に数分〜最大 24 時間程度かかることがあります。

## 画像の差し替え

無くてもグラデーションで表示されます。写真を使う場合は `styles.css` の CSS 変数を設定してください。

例:

```css
:root {
  --hero-image: url("assets/hero.jpg");
  --contact-image: url("assets/contact.jpg");
}
```

画像ファイル:

- `assets/hero.jpg`（ヒーロー背景）
- `assets/contact.jpg`（お問い合わせ背景）

## お問い合わせフォームを動かす（おすすめ手順）

GitHub Pages は静的サイトなので、フォーム送信先を外部にします。

### 方式A: メールを開くボタン（無料・いちばん簡単）

このリポジトリは現在この方式になっています（フォーム送信サービス不要）。

1. `main.js` の宛先を自社の受信メールに変更
   - `CONTACT_EMAIL_USER` / `CONTACT_EMAIL_DOMAIN`（`main.js`）
2. push して反映

注意:

- ユーザーの端末にメールアプリが設定されていないと、うまく開かない場合があります
- メールアドレスをページに表示するため、迷惑メール対策は受信側（フィルタ等）も併用がおすすめです

### 方式A: フォーム送信サービス（おすすめ）

代表的には Formspree / Getform / Formspark などがあります（どれも「フォーム送信 → メール転送」ができます）。

ここでは手順が分かりやすい **Formspree** を例にします。

#### 1) Formspree 側で準備

1. Formspree にサインアップ/ログイン
2. 新しいフォームを作成（「New Form」等）
3. 送信先メールアドレスを登録（必要なら認証/確認メール対応）
4. フォームのエンドポイント URL を控える（例: `https://formspree.io/f/xxxxxx`）
5. 可能なら「許可するドメイン（Allowed domains）」に下記を追加
   - `brunocasave.github.io`
   - `dotnull.co.jp`（独自ドメイン運用後）

#### 2) サイト側（このリポジトリ）を設定

`index.html` の `<form ... action="#">` の `action` を、控えた URL に差し替えます（`method="post"` はそのままでOK）。

例（Formspree の場合）:

```html
<form class="contact-form" method="post" action="https://formspree.io/f/xxxxxx">
```

#### 3) 動作確認

1. GitHub Pages のURL（例: `https://BrunoCasave.github.io/dotnull-site/`）でフォームを開く
2. 3項目（お名前/メール/お問い合わせ内容）を入力して送信
3. Formspree のダッシュボードに届いているか、メールが届くか確認

#### 4) 送信後の遷移を「自分のサイト」にしたい（任意）

外部サービスによっては「送信完了後にリダイレクトするURL」を設定できます。

このリポジトリには送信完了ページとして `thanks.html` を用意しています。

- プレビュー中: `https://BrunoCasave.github.io/dotnull-site/thanks.html`
- 独自ドメイン運用後: `https://dotnull.co.jp/thanks.html`

Formspree 側のフォーム設定で「Redirect URL」等が設定できる場合は、上記URLを指定してください（画面の表記や項目名はサービス/プランにより異なります）。

#### 5) 迷惑送信（スパム）対策の目安（任意）

- フォームサービス側の reCAPTCHA / スパムフィルタを有効化
- 受信側でフィルタ（件名や送信元で振り分け）
- 必要ならフォーム項目に同意チェック（プライバシーポリシーへのリンク等）

### 方式B: 自前のAPI（発展）

「完全に自社管理で送信したい」「添付ファイルを扱いたい」「DBに保存したい」などの場合は、別途 API（例: Cloudflare Workers / AWS / Google Cloud など）を用意して `action` をその API に向けます。
