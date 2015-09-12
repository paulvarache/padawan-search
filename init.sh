ES_VERSION=1.7.1

sudo apt-get update
sudo apt-get install -y openjdk-7-jdk nginx git

cd /tmp
wget "https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-$ES_VERSION.deb"
sudo dpkg -i elasticsearch-$ES_VERSION.deb
wget "https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-x64.tar.gz"
tar xvf node-v4.0.0-linux-x64.tar.gz
sudo mv node-v4.0.0-linux-x64 /opt/nodejs

echo "PATH=$PATH:/opt/nodejs/bin" >> /home/vagrant/.bashrc

sudo npm install -g bunyan bower

cat > /etc/nginx/conf.d/search-api.conf << EOF
upstream search-api {
    server localhost:3000;
}
EOF

cat > /etc/nginx/sites-enabled/search-api.conf << EOF
server {
    listen      *:80;
    server_name search.padawan.local.com;

    location / {
        root    /var/www/wclient/src;
    }
}
EOF

cat > /etc/nginx/sites-enabled/search.conf << EOF
server {
    listen      *:80;
    server_name api.search.padawan.local.com;

    location / {
        proxy_pass          http://search-api;
        proxy_set_header    Host                \$host;
    }
}
EOF

sudo service nginx restart
sudo service elasticsearch restart
