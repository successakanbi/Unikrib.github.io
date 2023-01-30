#!/usr/bin/python3

import json
import requests
import base64

def convert_to_binary(url):
    """This converts an img file to binary format"""
    picture = requests.get(url)
    print(dir(picture))
    real_img = picture.text
    print(picture.content)
    with open('pictures', 'wb') as img_file:
        img_file.write(picture.content)
        print("Operation successful")

def convert_from_binary(file_path):
    with open(file_path, 'rb') as f:
        pic = json.load(f)
        return pic

if __name__ == '__main__':
    convert_to_binary('https://ik.imagekit.io/nzohesnyo/apartment-images/28099fab-8467-46a5-b653-1b8b75d80796__3ibRITYG.jpg')
    pic = convert_from_binary('pictures')
    print(pic)