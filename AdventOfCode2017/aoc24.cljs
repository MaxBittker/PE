(ns core 
    (:require [clojure.set :as sset]))

(def input "24/14
    30/24
    29/44
    47/37
    6/14
    20/37
    14/45
    5/5
    26/44
    2/31
    19/40
    47/11
    0/45
    36/31
    3/32
    30/35
    32/41
    39/30
    46/50
    33/33
    0/39
    44/30
    49/4
    41/50
    50/36
    5/31
    49/41
    20/24
    38/23
    4/30
    40/44
    44/5
    0/43
    38/20
    20/16
    34/38
    5/37
    40/24
    22/17
    17/3
    9/11
    41/35
    42/7
    22/48
    47/45
    6/28
    23/40
    15/15
    29/12
    45/11
    21/31
    27/8
    18/44
    2/17
    46/17
    29/29
    45/50")

(def inputs "0/2
    2/2
    2/3
    3/4
    3/5
    0/1
    10/1
    9/10")

(def initial-pipes 
    (set
      (map
        (fn [p] (set (map (fn [s] (js/parseInt s 10)) (.split (.trim p) "/"))))
        (.split input "\n"))))


(defn candidates [edge p]
    (filter (fn [s] (s edge)) p))

(defn p-str [p]
    (if (= 1 (count p))
        (* 2 (first p))
     (apply + p)))

(defn p-cmp [p i]
 (if (= 1 (count p))
    i
  (first (sset/difference p (set [i])))))
    
; (println initial-pipes)


; (println (map p-str pipes))

(defn bridge-compare [[l str] [lb strb]]
    ; (println l str lb strb)
    (if (= l lb)
        (< str strb)
        (< l lb)))

(defn bridge-max [l]
    ; (println l)
    (last (sort bridge-compare l)))

(defn build [[l str] edge pipes]
    ; (println l str edge pipes)
    
    (let [cnddts (candidates edge pipes)]
        ; (println "\t candidates:" cnddts)
        (if (empty? cnddts)
            [l str]
            (let [vs (map 
                        (fn [c] (build 
                                    [ (inc l)
                                     (+ str (p-str c))] 
                                    (p-cmp c edge)
                                    (sset/difference pipes (set [c]))))
                        cnddts)]  
             (bridge-max vs)))))

(println (build [0 0] 0 initial-pipes))