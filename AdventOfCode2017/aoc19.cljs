(require 'planck.io)
(def input (planck.io/slurp "input19.txt"))
;  (def input 
;     "    |          
;     |  +--+    
;     A  |  C    
; F---|--|-E---+ 
;     |  |  |  D 
;     +B-+  +--+ 
; ")

(def grid
   (vec 
       (map 
           #(clojure.string/split % "")
           (clojure.string/split-lines input))))


(map #(apply str %) grid)

(defn point-add [a b]
   (vec (map + a b)))

(defn invert [v]
  (vec (map - v)))

(def neighbors [[0 1] [0 -1] [-1 0] [1 0]])

(defn valid-neighbors [p]
       (map 
           (partial point-add p)
           neighbors))

           
(defn find-start []            
   [0 (.indexOf (first grid)  "|")])
   
(find-start)

(get-in grid (find-start))  
       
(defn lookup [pos]
   (get-in grid pos))


(defn assess-crossroads [loc pdir]
   (let [incoming (invert pdir)
          outs (filter (partial not= incoming) neighbors)
          locs (map (partial point-add loc) outs)
          values (map vector (map lookup locs) outs)
          new-dir (filter (fn [[v dir]] (and v (not= " " v))) values)]
        (cond (not= (count new-dir) 1) (throw (js/Error. (str outs locs values new-dir))))
        (second (first new-dir))))

(defn travel [loc prev-dir n]
    (let [  x (lookup loc)
            new-dir (case x
                        "|" prev-dir
                        "-" prev-dir
                        "+" (assess-crossroads loc prev-dir)
                        " " [0 0]
                        (do (println x)
                            prev-dir))
            new-loc (point-add loc new-dir)]
        (println x loc prev-dir new-dir)

        (if (or (nil? x) (< (count prev-dir) 1) (nil? prev-dir) (= new-dir [0 0]))
            n
            (recur new-loc new-dir (inc n)))))


(travel (find-start) [1 0] 0)
