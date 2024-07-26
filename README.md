# priem-mirea-competition-bot
Бот для отслеживания конкурсных списков РТУ МИРЭА

## Подробности
При запуске бота в env'ы указываются ID конкурсов, которые требуется отслеживать, а также персональный номер (СНИЛС) участника.

С помощью команды `/start` можно получить состояние списков и свои позиции в удобном формате. Каждые 10 минут бот проверяет списки на обновления, в случае изменений актуальная информация будет отправлена в указанный чат.

## Установка
### Clone repository
```bash
git clone https://github.com/nikitakoschelenko/priem-mirea-competition-bot.git
```

### Build image
```bash
docker build -t priem-mirea-competition-bot .
```

### Run
```bash
docker run -d \
  -e TELEGRAM_TOKEN=1234567890:abcdefghijklmnopqrstuvwxyz \
  -e TELEGRAM_CHAT_ID=123456789 \
  -e API_BASE_URL=https://priem.mirea.ru/competitions_api \
  -e COMPETITIONS=1788549175009353014,1788549653844729142 \
  -e PERSONAL_CODE=123-456-789-00 \
  priem-mirea-competition-bot
```
