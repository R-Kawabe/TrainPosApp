# 電車検索サービスのサンプル

## 実行方法

```
$> php -S 0.0.0.0:8000
```

http://localhost:8000 にアクセスすると、開ける


## 製作課題
- 種別・行先に色付け
- dest->line別に判定し路線記号付与
- 路線記号にも色付け
- ページレイアウトなど
- CSS
- 右側にサイドバー追加（検索フォーム、他ページリンク）
- それかヘッダーに他ページリンク？
- 少なくともヘッダーには会社・エリア別のタブボタンは億
- 運用検索ページの作成

## 一段落したこと
- 路線を選択 ボタン？セレクトボタン？プルダウン？→ボタン
- 路線選択後、どうするか apiはPHPで叩くとして →確定
- button のvalueにkyoto のように付与し、JSON検索
- JSONには必要なAPIのアドレスの路線部分をつける
