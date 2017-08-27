(ns app.core
  (:require [clojure.math.numeric-tower :as math]))                  

(defn -main
  "I don't do a whole lot."
  [x]
  (println (math/expt (bigint 4 ) (bigint 200)))
  (println x "Hello, World!"))
