sudo chown -R $USER:$(id -gn $USER) ./* # this gives the host OS (and by that to the code editor u using) permissions to eddit the content of this folder

sudo docker build -t my_node_app_dev.image . # build the image and names it 'my_node_app_dev.image'

{ # try
    docker rm -f my_node_app_dev.container # remove the container in case its already exist. rm: remove, -f: force - in case the older version of this container is already exist and runing
} || { # catch
    echo 'container name my_node_app_dev.container is free'
}

docker run -itd --name my_node_app_dev.container -p 30001:3000 -v ${PWD}:/app my_node_app_dev.image 
#
#  docker run -itd : run the container seperatly from the cli. if the cli is closed the container keep on runing
#  --name my_node_app_dev.container : container's name
#  -p 30001:3000 : connect host's port 30001 to container's port 3000 (-p <host port>:<container port>)
#  -v ${PWD}:/app : mount the current directory (the one considerd as pwd when runing this command) into the container app folder
#  my_node_app_dev.image : the image to run the container from
#  #bash #u can opptionaly specify a 'main' command for the contaienr runtime#  
#  #bash 
#

docker exec -it my_node_app_dev.container bash # connect to a cli inside the container
#
# docker exec : docker execute
# -it : 'i' means interactive, if u run a command and close the shell, the procces will keep on runing. 't' - i donk realy know, somthing with the output and 'TTY'
# my_node_app_dev.container : in what container to execute (select the container by that given name)
# bash : what to run, in this case, run a bash shell
#

