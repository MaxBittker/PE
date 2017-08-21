;a = 7 and n = 3,
(defn top [a n]     
    (+ 
        (.pow (inc a) n)
        (.pow (dec a) n)))

(defn bottom [a]
    (* a a))

(defn r [a n]
    (rem 
     (top a n)
     (bottom a)))

(defn rseq [a]
   (map (partial r a) 
    (range 1M 1000000M)))

(defn distances [rs]
 (let [f (first rs)]
    (map first
            (filter 
                (fn [[i v]] (= f v))
                (map-indexed list rs)))))

(def llpa 5)

(defn look-like-pattern [rs]
    (let [ds (take llpa (next (distances rs)))    
           fd (first ds)]
        (= 
            (map #(/ % fd) ds)
            (range 1 (inc llpa)))))   

                
(defn patterns [rs]
    (let [ds (next (distances rs))]    
        (map #(partition % rs) ds)))

(defn patterns-match? [p]
    (apply = (take 10 p)))

(defn real-patterns [rs]
    (filter patterns-match? (patterns rs)))

(defn best-pattern [rs]
    (count (first (first (real-patterns rs)))))

(defn rmax [a]
    (let [rs (rseq a)] 
        (apply max 
            (take (best-pattern rs) rs))))
       
(def arange (range 3M 1001M))

(map
    (fn [l] 
        (let [a (reduce + l)]
            (println a)
            l))
 (partition-all 100 (pmap rmax arange)))
