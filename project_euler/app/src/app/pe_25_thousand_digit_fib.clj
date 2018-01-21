(def fib (map first (iterate (fn [[a b]] [b (+' a b)]) [0 1])))
(first (filter (fn [[i s]] (>= (count s) 1000)) (map-indexed vector (map str fib))))