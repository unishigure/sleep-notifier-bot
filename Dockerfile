FROM oven/bun:latest

ARG USERNAME="ps-notifier"
RUN useradd -m $USERNAME
WORKDIR /home/$USERNAME/sleep-notifier-bot

COPY ./src ./src
COPY ./package.json ./
COPY ./bun.lockb ./
RUN chown $USERNAME:$USERNAME ./

RUN bun install

USER $USERNAME
WORKDIR /home/$USERNAME/

ENTRYPOINT ["bun", "sleep-notifier-bot/src/cron.ts"]
