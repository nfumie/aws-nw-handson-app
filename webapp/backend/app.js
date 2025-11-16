require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// 商品マスタのサンプルデータ
const items = [
  {
    id: 1,
    name: "ワイヤレスマウス",
    price: 2980,
    category: "PC周辺機器",
    stock: 45,
    description: "静音設計で快適な操作性を実現したワイヤレスマウス",
    image_url: "https://example.com/images/mouse.jpg"
  },
  {
    id: 2,
    name: "メカニカルキーボード",
    price: 12800,
    category: "PC周辺機器",
    stock: 23,
    description: "赤軸採用のゲーミングキーボード。RGB バックライト付き",
    image_url: "https://example.com/images/keyboard.jpg"
  },
  {
    id: 3,
    name: "32インチ4Kモニター",
    price: 45800,
    category: "ディスプレイ",
    stock: 12,
    description: "IPSパネル採用、HDR対応の高解像度モニター",
    image_url: "https://example.com/images/monitor.jpg"
  }
];

// /items エンドポイント
app.get('/items', (req, res) => {
  console.log('GET /items - 商品マスタを返します');
  res.json({
    success: true,
    count: items.length,
    items: items
  });
});

// ルートパス（動作確認用）
app.get('/', (req, res) => {
  res.json({
    message: 'バックエンドサーバーが稼働中です',
    endpoints: ['/items']
  });
});

// サーバー起動
app.listen(PORT, '0.0.0.0', () => {
  console.log(`バックエンドサーバーが http://0.0.0.0:${PORT} で起動しました`);
  console.log(`商品マスタ取得: http://localhost:${PORT}/items`);
});
