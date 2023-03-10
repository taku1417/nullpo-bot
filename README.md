# nullpobot  
[![CodeFactor](https://www.codefactor.io/repository/github/taku1417/nullpo-bot/badge)](https://www.codefactor.io/repository/github/taku1417/nullpo-bot)  
身内discord鯖用のbotのソースコード。heroku上で稼働。言語はjavascript。node.jsを使用。  
herokuのAutomatic Deployはmainに設定されています。  
超環境依存してるので自鯖で立てても機能しません。コミュニティbotであるため修正予定もありませんのでご了承ください。  
  
English↓(I use google translate, so it may be difficult to read...)  
Source code of bot for private discord server. Running on heroku. The language is javascript. Using node.js.  
Heroku's Automatic Deploy is set to main.  
Because it is very dependent on the environment, it will not work even if it is set up on its own server. Please note that this is a community bot and there are no plans to fix it.  
  
ブランチの説明  
・main  
コミットごとに本番環境であるherokuにデプロイされる。ダウンタイムは20秒未満であるため、すぐに反映したい時はこちらに直コミットします。  
  
・minor-change-(n)  
すぐに反映する必要のない変更はこちら。1週間～1か月ごと(≒不定期)にmainにマージする。  
  
その他のブランチは大きな変更を伴うもの。機能の追加は一旦別ブランチで開発し、ローカル環境で動くことを確認してからmainへマージします。  
