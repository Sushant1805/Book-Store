#!/bin/bash
cd /home/ec2-user/bookstore-app/backend
npm install
cd ../frontend/frontend
npm install
npm run build
