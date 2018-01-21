(def l (Math/pow 26 3))
(def n (Math/pow 10 3))
(def t (* l n))

(def ncs (- t n))
(def nss n)

(defn fact[x]
  (if (<= x 1) 1 (* x  (fact (- x 1)))))

(defn combinations [n k]
  (/ (fact n)
    (* (fact k)
      (fact (- n k)))))

(def deck (apply hash-map (flatten (map-indexed vector (take n (repeat l))))))

(take 10
  (iterate conj a (rand-int 1000)
    #{}))


(take-while (fn has-match)
 (iterate
  (fn [v] (conj v (rand-int 1000)))
  #{}))

(defn complement [total n]
  (- total n))

(defn howmany [s n]
  (reduce
    (fn [acc current]
      (if (acc (complement n current))
        (reduced (inc (count acc)))
       (conj acc current)))
    #{}
    s))

(defn permutations [s]
  (lazy-seq
   (if (seq (rest s))
     (apply concat (for [x s]
                     (map #(cons x %) (permutations (remove #{x} s)))))
     [s])))

(defn expected [n]
  (/
    (apply +
      (map (fn [s] (howmany s n)) (permutations (range n))))
    (fact n)))
