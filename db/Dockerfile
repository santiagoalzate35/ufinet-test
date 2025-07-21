FROM mcr.microsoft.com/mssql/server:2022-latest

USER root
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y curl gnupg apt-transport-https && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev && \
    ln -s /opt/mssql-tools18/bin/sqlcmd /usr/bin/sqlcmd && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh init.sql /usr/src/app/
RUN chmod +x /usr/src/app/entrypoint.sh && \
    chown mssql:mssql /usr/src/app/entrypoint.sh /usr/src/app/init.sql

USER mssql
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
