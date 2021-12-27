[來源](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/First_steps/Strings)

# 模版字符串(Template literals)
## 將標準字串轉變為模版字符串，你需要將引號 (' ', or " ") 換為重音符 (backtick characters (` `) )

### Tradition 
```
let song = 'Fight the Youth';
```

### Template literals
```
let song = `Fight the Youth`;
```

### Compare
```
let score = 9;
let highestScore = 10;
//Tradition
let output = 'I like the song "' + song + '". I gave it a score of ' + (score/highestScore * 100) + '%.';
//Template literals
output = `I like the song "${ song }". I gave it a score of ${ score/highestScore * 100 }%.`;

//傳統斷行要加\n
output = 'I like the song "' + song + '".\nI gave it a score of ' + (score/highestScore * 100) + '%.';
//模板斷行直接斷行
output = `I like the song "${ song }".
I gave it a score of ${ score/highestScore * 100 }%.`;
```

**Internet Explorer不支援模板字符串**