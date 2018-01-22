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
