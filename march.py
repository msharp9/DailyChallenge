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



# Rotate clockwise:
def rotate_clockwise(matrix):
    output = [];
    for i,m in enumerate(matrix):
        for j,n in enumerate(m):
            if i > 0:
                output[j] = n + output[j]
            else:
                output.append(n)
    return output
# or (yay python!)
def rotate_clockwise(m):
    return [''.join(_) for _ in zip(*m[::-1])]


# Implementing the luhn algorithm to catch transcription errors in CCs
# https://en.wikipedia.org/wiki/Luhn_algorithm
def validate(n):
    double = [int(c)*2 if i%2 else int(c) for i,c in enumerate(str(n)[::-1])]
    double = [x-9 if x>=10 else x for x in double]
    # if sum(double)%10:
    #     return False
    # return True
    return not sum(double)%10


# shorten middle names to initials
def initialize_names(name):
    names = name.split()
    for i in range(1, len(names)-1):
        names[i] = names[i][0] + '.'
    return ' '.join(names)


# Added freeway game algorithm
def freeway_game(dist_km_to_exit, my_speed_kph, other_cars):
    time_on_freeway = dist_km_to_exit/(my_speed_kph/60) # min
    score = 0
    for rp,speed in other_cars:
        if (rp <= 0 and speed>my_sped_kph) or (rp >= 0 and speed<my_speed_kph):
            pass
        elif rp<0 and speed<my_speed_kph:
            t = rp*speed/(speed - my_speed_kph)
            if time_on_freeway > t:
                score+=1
        elif rp>0 and speed>my_speed_kph:
            t = rp*speed/(speed - my_speed_kph)
            if time_on_freeway > t:
                score-=1
    return score


# Date format check - simple regex
import re
def date_checker(date):
    return bool(re.match('^\d\d-\d\d-\d\d\d\d \d\d:\d\d$', date))


# explosion
def explode(s):
    return ''.join([n*int(n) for n in s])


# File name cleaning
import os
import re

class FileNameExtractor:
    def extract_file_name(dirty_file_name):
        file, ext = os.path.splitext(dirty_file_name)
        return re.match(r'\d+_(.*)',file).group(1)


# STRING-ASCII_STRING
def solution(s):
    return chr(int(sum([ord(l) for l in s.upper()])/len(s)))
# meeting length requirement
solution=lambda s:chr(sum(map(ord,s.upper()))//len(s))


# A little finance
import math
def calculate_retirement(P, FV):
    rates = {1:0,2:0,3:0,4:0,5:0,6:0}
    for i in range(1,7):
        r = i/100
        rates[i] = math.ceil(math.log(1+(FV*r)/(P*r+P))/math.log(1+r))
    return rates


# Zip longest function
def or_arrays(arr1, arr2, z=0):
    out = []
    for i in range(max([len(arr1),len(arr2)])):
        if i >= len(arr1):
            x = z
        else:
            x = arr1[i]
        if i >= len(arr2):
            y = z
        else:
            y = arr2[i]
        out.append(x|y)
    return out
# or similarly
from itertools import zip_longest
def or_arrays(a1, a2, d=0):
    return [x|y for x,y in zip_longest(a1, a2, fillvalue=d)]
