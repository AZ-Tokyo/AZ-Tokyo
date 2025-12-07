# AZ-Tokyo

[「法令」×「デジタル」ハッカソン](https://www.digital.go.jp/news/bb600dd7-d3a6-44a1-8138-b7bba052ac9c) のプロダクトを開発するレポジトリです。


## 環境構築

### コミットメッセージのテンプレートを設定

各自でレポジトリをクローンしたらコミットメッセージのテンプレートを設定してください。
このレポジトリをクローンしたディレクトリに移動して以下のコマンドを実行してください。

```
git config commit.template ./commit_template.txt
```

これでコミット時にテンプレートとコミットメッセージのルールを確認しながらコミットできます。
テンプレートを確認しながらコミットするには、以下のように実行します。

```
git commit -v   # `-m` オプションは使わないでください
git commit      # 設定によってはオプションなしでもできます
```

上記のように実行すると、Git に設定されたデフォルトエディタで一時ファイルが開かれます。この一時ファイルには先ほど設定したテンプレートが組み込まれています。
`-m` オプションを使うとテンプレートを確認しながらコミットできません。

なお、デフォルトエディタを変更する場合は以下のように設定します。

```
git config --global core.editor "vim"           # vim をデフォルトエディタにする
git config --global core.editor "code --wait"   # VS Code をデフォルトエディタにする
```


## バックエンド側の環境構築

### ○ Linux の場合

apt で Go 言語のインストールする。

```
sudo apt update         # 不要かも？
sudo apt install golang
```

backend ディレクトリに移動して実行する。実行したらブラウザで http://localhost:8080/ にアクセスして確認する。

```
cd /backedn && go run cmd/server/main.go
```

### ○ Windows の場合

Winget で Go 言語のインストールする。

```
winget install --id GoLang.Go
```

backend ディレクトリに移動して実行する。実行したらブラウザで http://localhost:8080/ にアクセスして確認する。

```
# コマンドプロンプトや Power Shell の場合
cd \backedn && go run cmd\server\main.go

# Git Bash の場合
cd /backedn && go run cmd/server/main.go
```

