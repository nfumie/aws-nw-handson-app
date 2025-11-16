
## アプリの実行

### frontend
```
git clone xxxxxxx
cd webapp/frontend
echo BACKEND_URL=http://ご自身の環境のバックエンドサーバーのIPに書き換えてください:3001 >> .env
cat .env

npm install
npm start
```

### backend
```
git clone xxxxxxx
cd webapp/backend
npm install
npm start
```

## ファイル構成
```
.
├── backend
│   ├── .env
│   ├── app.js
│   └── package.json
├── frontend
│   ├── .env
│   ├── app.js
│   └── package.json
└── README.md
```

