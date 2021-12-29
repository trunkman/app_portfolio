FROM ruby:3.0.2
ENV TZ Asia/Tokyo

RUN apt-get update -qq
WORKDIR /myapp

# nodejs(LTS)をインストール
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt-get install -y nodejs

# yarnをインストール
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt install -y yarn

COPY ./backend /myapp
RUN gem install bundler -v 2.2.27
RUN bundle install

RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids

# コンテナ起動時に実行されるスクリプト
COPY ./backend/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
