FROM oven/bun:latest

RUN apt-get update
RUN apt-get install -y sudo curl nano

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN mkdir /etc/sysconfig
RUN echo $PATH >/etc/sysconfig/ps-notifier

ARG USERNAME="ps-notifier"
RUN useradd -l -u "10000" -m "$USERNAME" -G sudo
RUN echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >>/etc/sudoers

WORKDIR /home/$USERNAME/sleep-notifier-bot

COPY ./src /home/$USERNAME/sleep-notifier-bot/src
COPY ./package.json /home/$USERNAME/sleep-notifier-bot/
COPY ./bun.lockb /home/$USERNAME/sleep-notifier-bot/
RUN chown $USERNAME /home/$USERNAME/sleep-notifier-bot/

RUN bun install

USER $USERNAME
WORKDIR /home/$USERNAME/

ENTRYPOINT ["bun", "sleep-notifier-bot/src/cron.ts"]
