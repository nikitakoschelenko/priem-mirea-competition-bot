# priem-mirea-competition-bot

## Clone repository
```bash
git clone https://github.com/nikitakoschelenko/priem-mirea-competition-bot.git
```

## Build image
```bash
docker build -t priem-mirea-competition-bot .
```

## Run
```bash
docker run -d \
  -v ./prisma/production.db:/app/prisma/production.db \
  -e TELEGRAM_TOKEN=1234567890:abcdefghijklmnopqrstuvwxyz \
  -e TELEGRAM_CHAT_ID=123456789 \
  -e API_BASE_URL=https://priem.mirea.ru/competitions_api \
  -e COMPETITIONS=1788549175009353014,1788549653844729142 \
  -e PERSONAL_CODE=123-456-789-00 \
  priem-mirea-competition-bot
```
