(def thousand "thousand")
(def hundred "hundred")

(def nums ["zero" "one" "two" "three" "four" "five" "six" "seven" "eight" "nine" "ten" "eleven" "twelve" "thirteen" "fourteen" "fifteen" "sixteen" "seventeen" "eighteen" "nineteen"])

(def tens ["zero" "ten" "twenty" "thirty" "forty" "fifty" "sixty" "seventy" "eighty" "ninety"])

(defn nullable [n other]
    (if (zero? n) "" other))

(defn x-place [suffix]
    (fn [n]
        (nullable n    
            (str (nums n) suffix))))

(def t-place (x-place thousand))
(def h-place (x-place hundred))
(def o-place (x-place ""))
        
(defn dd-place [n]
    (if (< n 20)
        (o-place n)
        (let [tp (Math/floor (/ n 10))
              op (rem n 10)]
         (str (tens tp) (o-place op))


(defn decompose [n]
 (let [t (Math/floor (/ n 1000))
        h (Math/floor (/ (rem n 1000) 100))
        dd (rem n 100)]  
    [t h dd]))

(defn build [n] 
      (let [[t h dd] (decompose n)]                  
        (str 
            (t-place t) 
            (if (every? pos? [t h]) "and" "")
            (h-place h)
            (if (every? pos? [h dd]) "and" "")
            (dd-place dd))))


(count (apply str (map build (range 1 1001))))
;21124