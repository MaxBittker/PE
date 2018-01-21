(def collatz-values (atom (sorted-map 1 0)))

(defn collatz [n]
    (if (even? n)
     (/ n 2)
     (inc (* 3 n))))

(defn collatz-stump [vs n]
    (take-while 
        (fn [cv] (nil? (vs cv))) 
      (iterate collatz n)))

(defn translated-stump [vs n]
    (let [stump (collatz-stump vs n)]
        (if (empty? stump)
            stump
            (let [o (inc (vs (collatz (last stump))))]
                (map-indexed (fn [i v] [v (+ i o)]) (reverse stump))))))
        
(defn collatz-insert [vs n]
    (if (= n 1)
        vs
        (let [nv (collatz n)
              parent-depth (vs nv)]
            (into vs (translated-stump vs n)))))
             
(defn update-map [n]
    (swap! collatz-values collatz-insert n)     
  [n (@collatz-values n)])           

(reduce 
  (fn [[on ov] [n v]] (if (> v ov) [n v] [on ov])) 
 (map update-map (range 1 1000000)))




