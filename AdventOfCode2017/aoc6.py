input = "5,1,10,0,1,7,13,14,3,12,8,10,7,12,0,6".split(",")
# input = "0,2,7,0".split(",")

combos = set()

heights = [int(v) for v in input]


def redistribute_highest():
    biggest = max(heights)
    i = heights.index(biggest)
    n = heights[i]
    heights[i] = 0

    for b in range(1, n + 1):
        xi = (i + b) % len(heights)
        heights[xi] += 1
        # print(" "+ "   "*xi + "v")
        # print(heights)

r = 0
target = None
last_r = 0
while True:
    h = str(heights)
    if h in combos and target is None or target == h :
        print(r, r - last_r)
        last_r = r
        # print(h)
        target = h
        # break;
    combos.add(h)
    redistribute_highest()
    r+=1
