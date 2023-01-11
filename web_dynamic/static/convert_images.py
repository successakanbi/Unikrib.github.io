#!/usr/bin/python3

import json


def convert_to_binary(files, path_file):
    """This converts an img file to binary format"""
    with open(path_file, 'wb') as f:
        json.dump(files, f)

def convert_from_binary(file_path):
    with open('upload_images/' + file_path, 'rb') as f:
        pic = json.load(f)
        return pic
