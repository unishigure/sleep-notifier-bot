# Sleep Notifier Bot

Note sleep notification to Misskey :bell:

## Deploy

1. Edit `.env` file

   ```ps
   cp .env.sample .env
   ```

2. Build Docker Container

   ```ps
   docker-compose up -d
   ```

### Optional

- Check connection

  ```bash
  docker exec -it ps-notifier bun run sleep-notifier-bot/src/test.ts
  ```
