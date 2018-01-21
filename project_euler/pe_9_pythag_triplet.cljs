(defn third [a b] (- 1000 a b))
(defn triple? [[a b c]] (= (+ (* a a) (* b b) ) (* c c)))
(def trips (for [a (range 1 497) b (range 1 a)] [a b (third a b)]))
(apply * (first (filter triple? trips)))