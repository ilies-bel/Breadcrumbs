FROM ruby:2.7.2

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN gem install bundler


COPY Gemfile /Gemfile
COPY Gemfile.lock /Gemfile.lock

RUN bundle install
COPY . /


EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

