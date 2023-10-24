FROM node:latest

RUN apt-get update && apt-get install -y sudo systemctl nano
RUN npm install -g pnpm

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

ARG USERNAME="ps-notifier"
RUN useradd -l -u "10000" -m "$USERNAME" -G sudo
RUN echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >>/etc/sudoers

WORKDIR /home/$USERNAME/sleep-notifier-bot

COPY ./src /home/$USERNAME/sleep-notifier-bot/src
COPY ./package.json /home/$USERNAME/sleep-notifier-bot/
COPY ./pnpm-lock.yaml /home/$USERNAME/sleep-notifier-bot/
RUN chown $USERNAME /home/$USERNAME/sleep-notifier-bot/

RUN pnpm install

RUN cp /home/$USERNAME/sleep-notifier-bot/src/ps-notifier.service \
    /etc/systemd/system/ps-notifier.service

USER $USERNAME
WORKDIR /home/$USERNAME/
