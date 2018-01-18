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
