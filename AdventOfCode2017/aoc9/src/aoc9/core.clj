(ns aoc9.core
  (:gen-class)
  (:require [instaparse.core :as insta :refer [defparser]]))
  

(def groups-parse
  (insta/parser
    "Gr = <'{'> {(Tr|Gr)<','>} (Tr|Gr)? <'}'>
     Tr = <'<'> {TrCh} <'>'>
     TrCh = <('!' #'.')> | #'[^!>]'
    "))
       
(defn score-group [[tag & content]]
  (if (= tag :Gr)
    (conj 
      (map inc (flatten (map score-group content)))
      1)
    []))

(defn score-stream [stream]
  (let [parsed (groups-parse stream)]
    (println parsed)
    (apply + (score-group parsed))))


(def example-cases 
  [
      ["{}" 1]
      ["{{}}" 3]
      ["{{{}}}" 6]
      ["{{{{}}}}" (+ 1 2 3 4)]
      ["{{},{}}" 5]
      ["{{{},{},{{}}}}" 16]
      ["{<a>,<a>,<a>,<a>}" 1]
      ["{{<ab>},{<ab>},{<ab>},{<ab>}}" 9]
      ["{{<!!>},{<!!>},{<!!>},{<!!>}}" 9]
      ["{{<a!>},{<a!>},{<a!>},{<ab>}}" 3]])
  
(def garbage-examples 
  [
    ["{<>}" 0]
    ["{<random characters>}" 17]
    ["{<<<<>}" 3]
    ["{<{!>}>}" 2]
    ["{<!!>}" 0]
    ["{<!!!>>}" 0]
    ["{<{o\"i!a,<{i<a>}" 10]])
    

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  ; (println (score-stream (slurp "input.txt")))
  (doall 
    (map 
        (fn [[i e]]
            (println  i e (score-stream i) "\n"))
        garbage-examples)))
  ; (doall 
  ;   (map 
  ;       (fn [[i e]]
  ;           (println  i e (score-stream-A i) "\n"))
  ;    example-cases)))



