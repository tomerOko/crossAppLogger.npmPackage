# choose a basic image to start from
FROM node:16

# i dont know why its needed, node threw some errors and it fixed it
RUN npm install -g npm@8.3.1

# needed binaries (typescript for the 'tsc' compile command, nodemaon for the 'nodemon' run command, and so on..)
RUN npm i -g typescript@4.5.4 jest@27.4.7 nodemon@2.0.15 ts-node@10.4.0

# its probbably on the root directory by default, but just in case 
WORKDIR /

# a convention directory name to put the app in
RUN mkdir app