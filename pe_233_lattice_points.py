from sympy import factorint

def a(n): # Orson R. L. Peters, Jan 31 2017
    r = 1
    for p, e in factorint(n).iteritems():
        if p%4 == 1: r *= 2*e + 1
        if r *4 > 420: return 0;
    return 4*r if n > 0 else 0

print(a(10000))

tot = 0
for i in range(10**11):
    c = a(i)
    if (i % 10**7) == 0:
        print(i, tot)
    if c == 420: 
        tot = tot+i

print(tot)