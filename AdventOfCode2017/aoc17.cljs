; It starts with a circular buffer containing only the value 0, which it marks as the current position. 

; It then steps forward through the circular buffer some number of steps (your puzzle input) before inserting the first new value, 1, after the value it stopped on. 

; The inserted value becomes the current position. 
; Then, it steps forward from there the same number of steps, and wherever it stops, inserts after it the second new value, 2, and uses that as the new current position again.

(def puzzle 371)

(defn foo [runner-up steps pos n]
    (let [  l (inc n)
            new-pos (inc (mod (+ pos steps) l))
            runner-up (if (= 1 new-pos) (inc n) runner-up)]
        
        (cond (= 1 new-pos)
            (println runner-up new-pos n l))
        
        (if (= n 50000000)
            runner-up
            (recur 
                runner-up
                steps
                new-pos
                (inc n)))))


(foo 0 puzzle 0 0)

