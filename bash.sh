$ git clone git://github.com/lxc/lxcfs
cd lxcfs
./bootstrap.sh
./configure
make
$ sudo mkdir -p /var/lib/lxcfs
$ sudo ./lxcfs -s -f -o allow_other /var/lib/lxcfs/
