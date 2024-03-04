# unique-domain-hosting

Auto-deploy unique domain hosting environment.

<br>

## Deployment of files and updating of configuration files

Set the unique domain name obtained from Amazon Route 53 in "cdk.json."

```json
"domainName": "Domain Name Settings"
```

<br>

Copy the set of application files you wish to deploy to the "dist" directory.

<br>

## Usage

Execution environment

- node v16.10.0
- npm v7.24.0
- aws-cdk v2.15.0

<br>

Install package

```bash
npm install
```

<br>

deploy

```bash
cdk deploy
```

<br>

## License

MIT

Copyright (c) 2022 Yasunori Kirimoto

<br>

---

<br>

### Japanese

<br>

独自ドメインホスティング環境を自動デプロイ

<br>

## 各ファイル配置と設定ファイル更新

「cdk.json」にAmazon Route 53で取得した独自ドメイン名を設定

```json
"domainName": "ドメイン名設定"
```

<br>

「dist」ディレクトリにデプロイしたいアプリケーションファイル一式をコピー

<br>

## 使用方法

実行環境

- node v16.10.0
- npm v7.24.0
- aws-cdk v2.15.0

<br>

パッケージインストール

```bash
npm install
```

<br>

デプロイ

```bash
cdk deploy
```

<br>

## License

MIT

Copyright (c) 2022 Yasunori Kirimoto

<br>
