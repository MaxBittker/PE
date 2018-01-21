(def suffix [17, 31, 73, 47, 23])

    
(defn make-input [raw]
  (flatten
   (repeat 64 
    (concat 
        (map #(.charCodeAt % 0) (vec raw))
        suffix))))

(def len 256)

(defn w [n]
    (mod n len))

(defn trim [c]
    (let [a (- (count c) len)
          b (- len a)]
     (take len (drop b (cycle (drop a c))))))

(defn twist [chain pos skip input]
    ; (println (count input))
    ; (println pos skip)
    (let [[i & r-inputs] input
          longchain (cycle chain)
          pre (take pos longchain)
          curl (reverse (take i (drop pos longchain)))
           sofar (count (concat pre curl))
          post (take (- (count chain) sofar) (drop sofar longchain))]
     (if (nil? r-inputs)
      (trim (concat pre curl post))
      (recur 
        (trim (concat pre curl post))
        (w (+ pos i skip))
        (w (inc skip))
        r-inputs))))

(defn pad [s]
    (if (= 2 (count s))
     s (str "0" s)))

(defn condense [sparse]
    (apply str
        (map #(pad (.toString % 16))
            (map 
                #(apply bit-xor %)
                (partition 16 sparse)))))

(defn compute-hash [raw]
    (let [i (make-input raw)
          sparse (twist (range len) 0 0 i)]
        (condense sparse)))

(def tests
  [
    ["" "a2582a3a0e66e6e86e3812dcb672a272"]
    ["AoC 2017" "33efeb34ea91902bb2f59c9920caa6cd"]
    ["1,2,3" "3efbe78a8d82f29979031a4aa0b16a9d"]
    ["1,2,4" "63960835bcdc130f0b66d7ff4f6a5a8e"]])

(println 
  (map 
    (fn [[in out]] 
    ;  (println (count (compute-hash in)) "\n" (count out))
     (= out (compute-hash in)))
    tests))


(def raw "14,58,0,116,179,16,1,104,2,254,167,86,255,55,122,244")
    

(def inputs 
    (map 
        (fn [i] (str "hfdlxzhv" "-" i))
        (range 128)))
  
(defn count-1s [st]
 (count (filter (partial = "1") st)))

(defn to-bin [hex]
  (vec
    (apply str
        (map 
            #(-> %
                (js/parseInt 16)
                (.toString  2)
                (.padStart  4 "0"))
            (.split hex "")))))
        

; (count-1s (apply concat grid))

(def grid
    (vec
        (map 
            to-bin
            (map 
                compute-hash
                inputs))))



(defn point-add [a b]
    (map + a b))
    
(def neighbors [[0 1] [0 -1] [-1 0] [1 0]])
        

(defn in-bounds? [p]                                        
    (every?
        (fn [p]
            (and 
                (<= 0 p)
                (> 128 p)))
     p))        

(defn valid-neighbors [p]
    (filter
        in-bounds?
        (map 
            (partial point-add p)
            neighbors)))

(defn flood [grid p]
 (let [nbs (valid-neighbors p)
       sn (filter #(= "1" (get-in grid %)) nbs) 
       ngrid (assoc-in grid p "2")]
    (reduce 
       flood
       ngrid 
       sn)))
    
(defn find-seed [grid]
    (let [ones  (filter 
                    (fn [[y v]]  (= "1" v))
                    (map-indexed vector (apply concat grid)))
          i (first (first ones))
          x (mod i 128)
          y (int (/ i 128))]
        (cond (not (nil? i))
          [y x])))          


(defn count-islands 
    ([grid] (count-islands grid 0))
    ([grid n] 
     (let [seed (find-seed grid)]
        (if seed
            (recur (flood grid seed) (inc n))
            n))))

(defn gp [g]       
    (map (partial take 8) (take 8 g)))
            
   
  

