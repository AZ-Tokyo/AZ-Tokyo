# GitHub Copilot Instructions for AZ-Tokyo

## このレポジトリについて
このレポジトリでは、日本のデジタル庁が提供する「法令API Version2」という API を使って会社登記が簡単にできるソフトウェアを開発します。このソフトウェア開発は、デジタル庁が主催する[『「法令」×「デジタル」ハッカソン』](https://www.digital.go.jp/news/bb600dd7-d3a6-44a1-8138-b7bba052ac9c)で取り組むものです。
今回は Web アプリケーションを開発します。この 1 つのレポジトリでバックエンドとフロントエンドを両方管理します。


## 「法令API Version2」について
「法令API Version2」の仕様は [https://laws.e-gov.go.jp/api/2/swagger-ui/](https://laws.e-gov.go.jp/api/2/swagger-ui/) にあります。「法令API Version2」は、 e-Gov という法令検索サイトに登録されている法令を API 経由で検索して取得できるものです。


## 開発言語とフレームワーク
開発言語とフレームワークは以下のような構成の予定です。

### バックエンド
- 使用言語: Go 言語
- Web フレームワーク: Gin
- テストフレームワーク: Go test と Testify

### フロントエンド
- 使用言語: TypeScript
- Web フレームワーク: React
- テストフレームワーク: vitest


## レビューのルール
プルリクエストをしたとき、あなた (GitHub Copilot) にレビューをしていただきたいです。その際は、以下の点を絶対に守ってください。

### レビューコメントの言語
レビューコメントはいかなる理由があっても、全てのレビューコメントは必ず「日本語」で回答してください。

### レビューコメントのラベル
それぞれのレビューコメントでは、必ず 1 行目に以下のいずれかのラベルを付けてください。

- ![Static Badge](https://img.shields.io/badge/must-ff3232?style=for-the-badge)
  - 必ず修正しないとマージしてはいけない重大なバグや実装ミスを指摘する。
- ![Static Badge](https://img.shields.io/badge/ask-ff9600?style=for-the-badge)
  - 変更された内容について質問する。
- ![Static Badge](https://img.shields.io/badge/imo-00afff?style=for-the-badge)
  - "In my opinion" の略称で、「私だったらこのように実装する」といった個人的な意見をコメントする。
- ![Static Badge](https://img.shields.io/badge/nits-7d64ff?style=for-the-badge)
  - "nitpicks" の略称で、修正しなくても問題ない細かい修正をコメントする。
- ![Static Badge](https://img.shields.io/badge/good-32e132?style=for-the-badge)
  - 変更された箇所のうち良い実装に対してコメントする。

それぞれのラベルが持つ意味に合わせて正しく使い分けてください。

### レビューで特に意識してほしいこと
レビューでは、これまでのソースコードや設定ファイルと、新たに変更された部分を比較して、詳細にレビューしてください。
また、以下の項目を特に意識してレビューしてください。

- Segmentation Fault / Bus Error / Memory leak など、重大なメモリエラーがないか。
- セキュリティの観点で脆弱性のある実装が存在していないか。
- 無限ループなどによってプログラムが動き続けることがないか。
- エラーが発生したとき、プログラムが終了することなく正しく処理できているか。
- これまでの実装と比較して、これまでの処理が正しく動かなくなるような、破壊的な変更がされていないか。
