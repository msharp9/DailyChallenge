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
