# -*- mode: ruby -*-
# vi: set ft=ruby :

# Some variables
domain = 'padawan.local.com'

Vagrant.configure("2") do |config|
    config.vm.define "web" do |web|

        web.vm.box = "debian/wheezy"
        web.vm.box_url = "http://heanet.dl.sourceforge.net/project/vagrantdebianboxes/debianwheezy.box"
        web.vm.hostname = "search." + domain
        web.vm.network "private_network", ip: "192.168.8.11"
        web.vm.synced_folder ".", "/vagrant", disabled: true

        web.vm.synced_folder "./wclient", "/var/www/wclient", type: "rsync", rsync__exclude: [".git/", "node_modules/", "vendor/"]
        web.vm.synced_folder "./api", "/opt/api", type: "rsync", rsync__exclude: [".git/", "node_modules/", "vendor/"]

        web.vm.provider "virtualbox" do |v|
            v.memory = 2048
            v.cpus = 4
            v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
            v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
        end

    end
    config.vm.provision "shell", path: "init.sh"
end
