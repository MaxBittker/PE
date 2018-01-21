(ns app.123-prime-square-remainder
    (:require [clojure.math.numeric-tower :as math]))                  
  
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

(defn top [n p]     
    (+ 
        (math/expt (inc p) n)
        (math/expt (dec p) n)))

(defn bottom [p]
    (* p p))

(defn r [n p]
  (let [n (bigint n)
        p (bigint p)]
    (rem 
     (top n p)
     (bottom p))))

(def irseq 
        (pmap (fn [[i p]] [i (r i p)]) 
            (take-nth 2
                (map-indexed (fn [i p] [(inc i) p])
                    primes))))


(defn first-exeeding [n]
 (first                 
    (filter (fn [[i v]] (> v (bigint n)))
     irseq)))

