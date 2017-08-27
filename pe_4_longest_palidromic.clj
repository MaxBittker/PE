

(defn is-palindrome? [n]
    (let [s (str n)
          c (count s)
          chk (partial nth s)
          flip (fn [i] (- c i 1))
          tocheck (range 0 (/ c 2))]  
     (every? 
        (fn [i] 
            (= 
                (chk i)
                (chk (flip i))))
      tocheck)))

(def td-products
    (for [x (range 999 0 -1)
          y (range 999 0 -1)]
     (* x y)))

(apply max (filter is-palindrome? td-products))
