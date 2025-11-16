require('dotenv').config();
const express = require('express');
const axios = require('axios');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// ルートパス
app.get('/', (req, res) => {
  const hostname = os.hostname();
  const html = `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ホーム</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }
      .container {
        background: white;
        padding: 50px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        text-align: center;
        max-width: 500px;
        width: 100%;
      }
      h1 {
        color: #333;
        font-size: 3rem;
        margin-bottom: 20px;
      }
      .hostname {
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 40px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 10px;
        border-left: 4px solid #667eea;
      }
      .hostname strong {
        color: #667eea;
      }
      .button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        padding: 18px 40px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: bold;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
      }
      .button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
      }
      .button:active {
        transform: translateY(-1px);
      }
      .icon {
        margin-right: 8px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🎉 Hello World!</h1>
      <div class="hostname">
        <strong>ホスト名:</strong> ${hostname}
      </div>
      <a href="/items" class="button">
        <span class="icon">🛍️</span>ECサイトにアクセス
      </a>
    </div>
  </body>
  </html>
  `;
  res.send(html);
});

// /items パス - バックエンドからデータを取得してHTML表示
app.get('/items', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/items`, {
      timeout: 5000 // 5秒のタイムアウト
    });
    
    const items = response.data.items || [];
    
    // HTMLを生成
    const html = `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>商品一覧</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          color: white;
          text-align: center;
          margin-bottom: 30px;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }
        .item-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }
        .item-id {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .item-name {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }
        .item-price {
          font-size: 1.8rem;
          color: #e74c3c;
          font-weight: bold;
          margin: 15px 0;
        }
        .item-price span {
          font-size: 1rem;
          color: #666;
        }
        .item-category {
          display: inline-block;
          background: #f0f0f0;
          color: #555;
          padding: 5px 15px;
          border-radius: 5px;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        .item-stock {
          color: #27ae60;
          font-weight: bold;
          margin: 10px 0;
        }
        .item-stock.low {
          color: #e74c3c;
        }
        .item-description {
          color: #666;
          line-height: 1.6;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        .back-link {
          display: inline-block;
          color: white;
          text-decoration: none;
          margin-bottom: 20px;
          padding: 10px 20px;
          background: rgba(255,255,255,0.2);
          border-radius: 25px;
          transition: background 0.3s ease;
        }
        .back-link:hover {
          background: rgba(255,255,255,0.3);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="/" class="back-link">← ホームに戻る</a>
        <h1>🛍️ 商品一覧</h1>
        <div class="items-grid">
          ${items.map(item => `
            <div class="item-card">
              <span class="item-id">ID: ${item.id}</span>
              <div class="item-name">${item.name}</div>
              <div class="item-category">${item.category}</div>
              <div class="item-price">¥${item.price.toLocaleString()} <span>税込</span></div>
              <div class="item-stock ${item.stock < 20 ? 'low' : ''}">
                在庫: ${item.stock}個 ${item.stock < 20 ? '(残りわずか!)' : ''}
              </div>
              <div class="item-description">${item.description}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </body>
    </html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('バックエンドへのリクエストエラー:', error.message);
    
    let errorMessage = 'サーバーエラーが発生しました';
    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'バックエンドサーバーに接続できません';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'バックエンドサーバーからの応答がタイムアウトしました';
    }
    
    const errorHtml = `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>エラー</title>
      <style>
        body {
          font-family: sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f5f5f5;
        }
        .error-box {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          text-align: center;
        }
        h1 { color: #e74c3c; }
        p { color: #666; margin-top: 10px; }
        a { color: #667eea; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="error-box">
        <h1>⚠️ エラー</h1>
        <p>${errorMessage}</p>
        <p style="margin-top: 20px;"><a href="/">← ホームに戻る</a></p>
      </div>
    </body>
    </html>
    `;
    
    res.status(error.code === 'ECONNREFUSED' ? 503 : 500).send(errorHtml);
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT} で起動しました`);
  console.log(`バックエンドURL: ${BACKEND_URL}`);
});