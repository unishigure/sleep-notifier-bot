# Sleep Notifier Bot

Note sleep notification to Misskey:bell:

## Deploy

### Linux

1. Add requirement

   ```bash
   npm install -g pnpm
   ```

2. Create user

   ```bash
   sudo useradd -m ps-notifier -s /bin/bash -G sudo
   sudo passwd ps-notifier
   ```

3. Clone repository

   ```bash
   sudo su - ps-notifier
   cd /home/ps-notifier
   ```

   ```bash
   git clone https://github.com/unishigure/sleep-notifier-bot.git
   ```

   ```bash
   cd ./sleep-notifier-bot
   ```

   ```bash
   pnpm install
   ```

4. Copy `./resource/.env.sample` to `./.env` and Fix settings.

   ```bash
   cp ./resource/.env.sample ./.env
   ```

5. Set TimeZone

   ```bash
   sudo ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
   ```

6. Start Service

   ```bash
   sudo cp /home/ps-notifier/sleep-notifier-bot/src/ps-notifier.service \
      /etc/systemd/system/ps-notifier.service
   ```

   ```bash
   sudo systemctl start ps-notifier.service
   sudo systemctl enable ps-notifier.service
   ```

### Docker

1. Copy `./resource/.env.sample` to `./.env` and Fix settings.

    ```ps
    cp ./resource/.env.sample ./.env
    ```

2. Build Docker Container

    ```ps
    docker-composer up -d
    ```

3. Start Service

    ```bash
    docker exec -it ps-notifier /bin/bash
    ```

    ```bash
    sudo systemctl start ps-notifier.service
    sudo systemctl enable ps-notifier.service
    ```

### Optional

- Display log

  ```bash
  sudo journalctl -u ps-notifier
  ```

  ```bash
  nano /var/log/journal/ps-notifier.service.log
  ```

- Check Service

  ```bash
  sudo systemctl status ps-notifier.service
  ```

- Stop Service

  ```bash
  sudo systemctl stop ps-notifier.service
  ```

- Disable Service

  ```bash
  sudo systemctl disable ps-notifier.service
  ```
