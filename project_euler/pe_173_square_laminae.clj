(def tiles 1000000)

(defn laminae-cost [[n t]]
  (- (Math/pow n 2)
    (Math/pow (- n (* t 2)) 2)))

(defn valid-layers [n]
   (range n 2 -2))   

(defn valid-thicknesses [n]
  (map-indexed (fn [i l] [n (inc i)])
    (valid-layers n)))
    
(defn valid-costs [n]
  (take-while 
    (fn [nt] (<= (laminae-cost nt) tiles))
    (valid-thicknesses n)))

(count 
   (mapcat valid-costs (range 3 260000)))
