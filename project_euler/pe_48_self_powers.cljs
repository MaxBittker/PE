(def wrap (Math/pow 10 10))

(def base 1000)

(defn self-power [n]
 (reduce
   (fn [val acc]
     (mod
      (* val acc)
      wrap))
   (take n (repeat n))))

(defn wrapping-sum [values]
  (reduce
    (fn [val acc]
      (mod
        (+ val acc)
        wrap))
    values))

(def numbers (rest (range (inc base))))

(def powers (map self-power numbers))

(def answer (wrapping-sum powers))


; If we calculate a2 mod 6 for 0 ≤ a ≤ 5 we get: 0,1,4,3,4,1.
; The largest value of a such that a^2 ≡ a mod 6 is 4.
; Let's call M(n) the largest value of a < n such that a^2 ≡ a (mod n).
; So M(6) = 4.
; Find ∑M(n) for 1 ≤ n ≤ 10^7.
