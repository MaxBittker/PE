(ns app.core
  (:require [clojure.math.numeric-tower :as math]                  

    (require '[clojure.string :as str])))

(defn -main
  "I don't do a whole lot."
  []
  (def digits (str/split (str (math/expt (bigint 2 ) (bigint 1000))) #""))
  (prinln (apply + (map (fn [s] (Integer. s )) digits))))
