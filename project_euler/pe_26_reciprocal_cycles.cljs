(def primes "Generates an infinite, lazy sequence of prime numbers"
  (let [reinsert (fn [table x prime]
                   (update-in table [(+ prime x)] conj prime))]
    (defn primes-step [table d]
                 (if-let [factors (get table d)]
                   (recur (reduce #(reinsert %1 d %2) (dissoc table d) factors)
                          (inc d))
                   (lazy-seq (cons d (primes-step (assoc table (* d d) (list d))
                                                 (inc d))))))
    (primes-step {} 2)))

(defn check-pattern [ps]
  (apply = (take 2 ps)))

(defn partitions [ds]
  (map
    #(partition % ds)
     (range 2 11)))

(defn recip [n]
  (str (bigint (/ (Math/pow 10 20) n))))

(defn digit [d n]
  (Math/floor
    (mod
      (/ (bigint (Math/pow 10 n))
        (bigint d))
      10)))

(defn digits [d]
  (map (partial digit d) (range  1 30)))

(defn pattern-length [n]
  (count (first
          (first
            (filter check-pattern
              (partitions (digits n)))))))

(map digits (take-while (partial > 1000) primes))
