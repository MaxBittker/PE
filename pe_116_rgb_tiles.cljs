(def tot 50)

(defn fact[x]
  (if (<= x 1) 1 (* x  (fact (- x 1)))))

(defn combinations [a b]
  (let [n (+ a b)
        k (max a b)]
      (/ (fact n)
        (* (fact k)
          (fact (- n k))))))

(defn count-pieces [l c]
  (let [cl (* c l)]
    (combinations c (- tot cl))))

(defn compositions [l]
  (range  1 (inc (quot tot l))))

(defn sum-counts [l]
  (apply +
    (map
      (partial count-pieces l)
     (compositions l))))

(apply + (map sum-counts [2 3 4]))
