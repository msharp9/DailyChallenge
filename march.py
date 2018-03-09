# random case function
from random import random

def random_case(x):
    return ''.join([l.upper() if random() < 0.5 else l.lower() for l in x])
