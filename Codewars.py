# Watching a parade:
# Deterime the times to watch the part of the parade you are interested in.
# groups = ['A','B','C','D','E','F']
# location = 3
# speed = 2
# pref = 'C'
#                   v
# Locations: |0|1|2|3|4|5|6|7|8|9|...
# F E D C B A      | |               time = 0
# > > F E D C B A  | |               time = 1
#     > > F E D C B|A|               time = 2
#         > > F E D|C|B A            time = 3
#                   ^
# parade_time(['A','B','C','D','E','F'], 3, 2,'C']) == [3]


# My code:
import math
def parade_time(groups, location, speed, pref):
    times = []
    for i,a in enumerate(groups):
        if a == pref:
            times.append(math.floor((location+i+1)/speed))
    return times

# Best code - Very similar, more pythonic (looks like I didn't need the floor bit)
def parade_time(groups, location, speed, pref):
    return [(location+i+1) / speed for i, g in enumerate(groups) if g == pref]

# Test code:
test.assert_equals(parade_time(['a','b','c','d','e','f'],3,2,'c'), [3])
test.assert_equals(parade_time(['c','b','c','d','e','f'],3,2,'c'), [2,3])


# A western man is tring to find gold in a river. To do that, he passes a bucket through the river's soil and then checks if it contains any gold. However, he could be more productive if he wrote an algorithm to do the job for him.
#
# So, you need to check if there is gold in the bucket, and if so, return True/true. If not, return False/false.

# my solution
def check_the_bucket(bucket):
    if "gold" in bucket:
        return True
    else:
        return False

# others:
def check_the_bucket(bucket):
    return 'gold' in bucket


test.describe("check_the_bucket")
test.it("should have the value True or False inside of it")
test.expect(check_the_bucket(['stone', 'stone', 'gold', 'stone', 'stone',]) == True, 'I will bye a teeth')
test.expect(check_the_bucket(['stone', 'stone', 'stone', 'stone', 'stone',]) == False, 'Not today')


# Binary multiplication:
# Above, we are given two numbers 100 and 15. we keep reducing the bigger number by dividing it by 2 and hold the integer part of the division till it is no more divisible by 2. Then we assign the real values to these reduced parts of m. Any reduced number [1,m] has real value of 0 if it is even, and it will have real value of 1 if it is odd. On the other hand the smaller number in this case n keeps on doubling itself the same amount of times m reduces itself. The idea of this method is to change multiplication of two big number to a sequence of multiplication by 0 or 1 and perform addition to get the final product. You can see that from the last column (r*n) above.
# if we sum the last column we get 0+60+0+0+480+960=1500=100*15 Now your task for this kata will be to get those non-zero number in the last column in an array and return it sorted in descending order.so for the above example the return will be [960,480,60].

# my solution
import math
# algorithm is independent of order, but question specifically says to reduce the bigger number
def bin_mul(m,n):
    m1 = m
    n1 = n
    m = max(m1,n1)
    n = min(m1,n1)
    res = []
    while(m>0):
        if m%2 and n!=0:
            res.append(n)
        n*=2
        m=math.floor(m*0.5)
    # check
    # print(m1, n1, m1*n1, sum(array))
    return res[::-1]

# similar code:
def bin_mul(m,n):
    if m < n: return bin_mul(n,m)
    if n == 0: return []
    res = []
    while m > 0:
        if m % 2 == 1: res.append(n)
        m = m//2; n *=2
    return res[::-1]


Test.it("Basic test")
Test.assert_equals(bin_mul(100,15),[960,480,60])



# Complete the function which get a number bigger than 10 and smaller than 10000 as input, then:
#
# sum all the digits of the number.
# subtract the sum from the number, and it is your new number.
# if the new number is in the list below return the associated fruit, otherwise return back to task 1.

# my solution
def SubtractSum(number):
    fruits = {1: "kiwi", 2: "pear", 3: "kiwi", 4: "banana", 5: "melon", 6: "banana", 7: "melon", 8: "pineapple", 9: "apple", 10: "pineapple", 11: "cucumber", 12: "pineapple", 13: "cucumber", 14: "orange", 15: "grape", 16: "orange", 17: "grape", 18: "apple", 19: "grape", 20: "cherry", 21: "pear", 22: "cherry", 23: "pear", 24: "kiwi", 25: "banana", 26: "kiwi",27: "apple", 28: "melon", 29: "banana", 30: "melon", 31: "pineapple", 32: "melon", 33: "pineapple", 34: "cucumber", 35: "orange", 36: "apple", 37: "orange", 38: "grape",39:"orange", 40: "grape", 41: "cherry", 42: "pear", 43: "cherry", 44: "pear", 45: "apple", 46: "pear", 47: "kiwi", 48: "banana", 49: "kiwi", 50: "banana", 51: "melon", 52:"pineapple", 53: "melon", 54: "apple", 55: "cucumber", 56: "pineapple", 57: "cucumber", 58: "orange", 59: "cucumber", 60: "orange", 61: "grape", 62: "cherry", 63: "apple", 64:"cherry", 65: "pear", 66: "cherry", 67: "pear", 68: "kiwi", 69: "pear", 70: "kiwi", 71: "banana", 72: "apple", 73: "banana", 74: "melon", 75: "pineapple", 76: "melon", 77:"pineapple", 78: "cucumber", 79: "pineapple", 80: "cucumber", 81: "apple", 82: "grape", 83: "orange", 84: "grape", 85: "cherry", 86: "grape", 87: "cherry", 88: "pear", 89: "cherry", 90: "apple", 91: "kiwi", 92: "banana", 93: "kiwi", 94: "banana", 95: "melon", 96: "banana", 97: "melon", 98: "pineapple", 99: "apple", 100: "pineapple"}
    sm = 0
    for n in str(number):
        sm+=int(n)
    number-=sm
    if number > 100:
        # SubtractSum(number)
        return 'apple'
    else:
        return fruits[number]

# Simple solution, all numbers >100 will always end at 99 which is apple.  All other solutions will end up being apple as well due to the pattern hidden in the dictionary.
def SubtractSum(number):
    return "apple"


# Calculating pet years

# my solution:
def human_years_cat_years_dog_years(human_years):
    if human_years == 1:
        res = [human_years,15,15]
    elif human_years == 2:
        res = [human_years,24,24]
    else:
        res = [human_years,24+4*(human_years-2),24+5*(human_years-2)]
    return res

# most other code is similar grabbing something different:
def human_years_cat_years_dog_years(x):
    return [x, 24+(x-2)*4 if (x != 1) else 15, 24+(x-2)*5 if (x != 1) else 15]



# Converting GPS coorinates from DD to DMS
# This one was pretty fun, required doing some research

# my solution
def convert_to_dms(dd_lat, dd_lon):
    dd_lat = str(float(dd_lat))
    dd_lon = str(float(dd_lon))

    ns = "S" if "-" in dd_lat else "N"
    ew = "W" if "-" in dd_lon else "E"

    def lpad(s,n):
        while len(s) < n:
            s = '0' + s
        return s

    def dms(dd,dir):
        (d, x) = dd.split(".")
        d = str(abs(int(d)))
        (m, x) = str(float("0." + x)*60).split(".")
        s = '{0:.3f}'.format(float("0." + x)*60)
        d = lpad(d,3)
        m = lpad(m,2)
        s = lpad(s,6)
        return '{}*{}\'{}"{}'.format(d,m,s,dir)

    dms_lat = dms(dd_lat, ns)
    dms_lon = dms(dd_lon, ew)

    return dms_lat, dms_lon

# other solution that is nice:
# what I like about this is that it doesn't needlessly convert back and forth from num and str
# he also does his padding right in the format
def convert_to_dms (*args):
    lst = []
    for i,v in enumerate(map(float,args)):
        av = abs(v)
        d  = int(av)
        m  = int((av-d)*60)
        s  = (av-d-m/60)*3600
        lst.append("{:03}*{:02}'{:06.3f}\"{}".format(d,m,s,["NS","EW"][i][v<0]))
    return tuple(lst)



# return 5 w/o using any of the following characters: 0123456789*+-/
# at first I was thinking hex, but a simpler idea worked:
def unusual_five():
    return len(['a','b','c','d','e'])
# other fun solutions:
def unusual_five():
    return 'HAHAHAHAHA'.count('HA')
unusual_five = lambda: ord("")
def unusual_five():
    return len("five!")
def unusual_five():
    return True << True << True | True


# Falling petals
def sakura_fall(v):
    if v <= 0:
        return 0
    return 80*5/v
# Strangely 5/v*80 kept failing due to rounding issues



# Remove first and last letters (quick one since little time today)
def remove_char(s):
    return s[1:-1]



# Fix the strings w/ extra #'s
import re
def string_clean(s):
    return re.sub('\d', '', s)

# an interesting pythonic non-regex way (I prefer regex)
def string_clean(s):
    return ''.join(x for x in s if not x.isdigit())




# Make a 2-d Array
def make_2d_list(head,row,col):
    return [[head+c+(r*col) for c in range(col)] for r in range(row)]




# Thinking and testing, solve the problem by evaluating test cases
# Kata was alot more like a puzzle
def testit(s):
    if len(s) < 2:
        return s
    o = [ord(l) for l in s]
    odds = [l for i,l in enumerate(o) if not i%2]
    evens = [l for i,l in enumerate(o) if i%2]
    sum1 = []
    for i in range(len(evens)):
        sum1.append(odds[i]+evens[i])
    char = [chr(s//2) for s in sum1]
    if len(s)%2:
        char.append(s[-1])
    return ''.join(char)


# a simple one
def better_than_average(class_points, your_points):
    return your_points > sum(class_points)/len(class_points)
