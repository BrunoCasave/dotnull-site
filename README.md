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

1. `index.html` の `<form ... action="#">` の `action` を外部サービスの URL に差し替え
2. 必要に応じて `method="post"` のまま送信

例（Formspree の場合）:

```html
<form class="contact-form" method="post" action="https://formspree.io/f/xxxxxx">
```

※外部サービスにより必須フィールドや迷惑メール対策が異なります。
