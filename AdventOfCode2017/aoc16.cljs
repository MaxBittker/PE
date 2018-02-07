(def pr (vec (.split "abcdefghijklmnop" "")))


(defn spin
    "Spin, written sX, makes X programs move from the end to the front, but maintain their order otherwise."
    [input X]
    (let [cX (- (count input) X)]
        (concat
            (drop cX input)
            (take cX input))))

(defn exchange 
    "Exchange, written xA/B, makes the programs at positions A and B swap places."
    [input [A B]]
    (let [[pA pB] (map #(nth input %) [A B])]
     (-> (vec input) 
        (assoc B pA)
        (assoc A pB))))

(defn partner 
    "Partner, written pA/B, makes the programs named A and B swap places."
    [input AB]
    (exchange 
        input 
        (map 
            #(.indexOf input %)
             AB)))


(require 'planck.io)
(def i (.split (planck.io/slurp "input16.txt") ","))

; (js/parseInt 10)


(defn command [input commandString]
 (let [c (first commandString)
       params (apply str (rest commandString))]
    (case c
        "s" (spin input (js/parseInt params 10))
        "x" (exchange input (map #(js/parseInt % 10) (.split params "/")))
        "p" (partner input (.split params "/")))))


(defn dance [[input seen]]
    (let [result (reduce command input i)
          rs (apply str result)]
        ; (println rs seen (apply str result))
        (cond (seen rs) (println (count seen)))
        [result (conj seen rs)]))

(apply str (first (reduce dance [pr (set [(apply str pr)])] (range 10))))

(rem 1000000000 30)
> 10
    
