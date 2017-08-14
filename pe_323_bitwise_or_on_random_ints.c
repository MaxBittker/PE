#include <stdio.h>
#include <time.h>
#include <stdlib.h>
// xi the following recursion is given:
//
//  x0 = 0 and
//  xi = xi-1| yi-1, for i > 0. ( | is the bitwise-OR operator)

int main()
{
   unsigned int xi = 0;
   int i = 0;

   srand(time(NULL));   // should only be called once
   double avg = 0;
   int trial;
   for (trial = 0; trial<1000000000; trial++){
     xi = 0;
     for (i = 1; i<100; i++)
     {
        xi = xi | rand();
        if(xi == 2147483647) break;
     }
     avg += i;
     if(trial % 10000000 == 0) {
       printf("i: %0.10f\n", avg / (double)trial);
     }
   }
   return 0;
}
