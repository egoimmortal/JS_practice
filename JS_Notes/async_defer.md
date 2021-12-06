[來源](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
# async & defer

> 舊的方法 :
>> 將script放在body的底部，這樣會在所有HTML被解析完才被載入，問題在腳本的載入與解析工作會被完成擋住，等到所有HTML載入完成。這樣會導致嚴重的效能問題，拖慢網站。
======

使用兩種方法可以閃過腳本被擋到的問題

## async
```
<script async src="js/vendor/jquery.js"></script>
<script async src="js/script2.js"></script>
<script async src="js/script3.js"></script>
```
* 使用**async**屬性載入的腳本，在下載的同時不會讓網頁的渲染被阻塞，並且在下載完成後馬上執行，不保證腳本會按照任何特定順序執行，只保證不去妨礙網頁中其他部份顯示工作。
* 當有許多非立即要使用的腳本，如果只希望能盡快載入完畢，就使用**async**
* 最佳使用情境是當腳本間彼此獨立，不依賴彼此運行的狀況下。
======

## defer
```
<script async src="js/vendor/jquery.js"></script>
<script async src="js/script2.js"></script>
<script async src="js/script3.js"></script>
```
* 使用**defer**屬性載入的腳本，會在腳本與內容都下載完成後，依照出現順序被執行。
* 全部具有defer屬性的腳本會依據出現的順序載入。
* 在網頁的所有內容被載入完成之前，是不會被執行的，當程式依賴某些元素存在時(例如要調整頁面上一到多個元素)，這個屬性很有用。
======
# 總結:
* **async**和**defer**屬性都是用來告訴Browser使用獨立線程來下載腳本，同一時間頁面的其他部份(如DOM)也在下載，因此頁面的載入不會因為腳本被影響。
* 如果腳本應該立即被執行，而且不依賴其他腳本先被載入，就用**async**
* 如果腳本依賴其他腳本先被解析或DOM已經存在，就用**defer**來載入，並根據想要Browser執行的順序安排。