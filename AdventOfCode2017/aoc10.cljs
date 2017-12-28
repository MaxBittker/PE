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
; dc7e7dee71d4c721ce42713e6b8359

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
    
(println (compute-hash raw))
