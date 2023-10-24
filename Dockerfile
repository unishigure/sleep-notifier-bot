FROM ubuntu:latest

RUN apt-get update && apt-get install -y sudo systemctl ca-certificates curl gnupg nano

RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install nodejs -y

RUN npm install -g pnpm

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN mkdir /etc/sysconfig
RUN echo $PATH >/etc/sysconfig/ps-notifier

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
