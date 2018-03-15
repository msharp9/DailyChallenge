# random case function
from random import random

def random_case(x):
    return ''.join([l.upper() if random() < 0.5 else l.lower() for l in x])


# string cleaning
def correct(string):
    return string.replace('0', 'O').replace('1', 'I').replace('5', 'S')
# or
def correct(string):
    return string.translate(str.maketrans("501", "SOI"))
