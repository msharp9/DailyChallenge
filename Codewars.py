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
