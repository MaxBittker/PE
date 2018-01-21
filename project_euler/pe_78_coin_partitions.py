from sympy.ntheory import npartitions
import sys

for n in range(0,sys.maxsize**10):
    np = npartitions(n)
    if np % 1000000 == 0:
        print(n)
        print(np)
    if n % 10000 == 0:
     print(n)
     print(np)
