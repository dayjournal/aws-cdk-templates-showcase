# location-service

Create an Amazon Location Service.

<br>

## Deployment of files and updating of configuration files

Set each service name in "location-service.ts."

```typescript
apiKeyName: 'LocationServiceApiKey',
mapName: 'LocationServiceMap',
placeIndexName: 'LocationServicePlace',
routeCalculatorName: 'LocationServiceRoute',
```

<br>

## Usage

Execution environment

- node v20.0.0
- npm v9.6.4
- aws-cdk v2.127.0

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

Copyright (c) 2024 Yasunori Kirimoto

<br>

---

<br>

### Japanese

<br>

Amazon Location Serviceの作成

<br>

## 各ファイル配置と設定ファイル更新

「location-service.ts」に各サービス名を設定

```typescript
apiKeyName: 'APIキー名',
mapName: 'MAP名',
placeIndexName: 'Place名',
routeCalculatorName: 'Route名',
```

<br>

## 使用方法

実行環境

- node v20.0.0
- npm v9.6.4
- aws-cdk v2.127.0

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

Copyright (c) 2024 Yasunori Kirimoto

<br>
