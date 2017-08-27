(def collatz-values (atom (sorted-map 1 0)))

(defn collatz [n]
    (if (even? n)
     (/ n 2)
     (inc (* 3 n))))

(defn collatz-insert [vs n]
    (if (= n 1)
        vs
        (let [nv (collatz n)
              parent-depth (vs nv)]
            (if (nil? parent-depth)
                vs
                (conj vs [n (inc parent-depth)])))))
             
(defn update-map [n]
    (swap! collatz-values collatz-insert n))                

(doall (map update-map (range 1 1000)))




