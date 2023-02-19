#!/usr/bin/python3

from models import fstorage

imgList = ['https://ik.imagekit.io/nzohesnyo/apartment-images/d5346022-478e-480a-863b-98e2c657b2e7_-yMf0WLKl.jpg', 'https://ik.imagekit.io/nzohesnyo/apartment-images/d5346022-478e-480a-863b-98e2c657b2e7_xj1DddGmR.jpg', 'https://ik.imagekit.io/nzohesnyo/apartment-images/d5346022-478e-480a-863b-98e2c657b2e7_G2xYluxpW.jpg']
for item in imgList:
    fileId = fstorage.get(item)
    if fileId == None:
        print("Not found")
    else:
        print(fileId)
        response = fstorage.delete(item)
        print(response)
