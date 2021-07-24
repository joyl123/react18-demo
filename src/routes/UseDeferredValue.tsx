import React, { useDeferredValue, useEffect, useState } from "react";

interface Props {
  keyword: string;
}
// 模拟接口返回的数据 一万条数据
function getWord(keyword: string) {
  let word = new Array(10000)
    .fill(0)
    .map((item: number, index: number) => keyword + index);
  return Promise.resolve(word);
}
//
function Suggestions(props: Props) {
  let [words, setWords] = useState<Array<string>>([]);
  useEffect(() => {
    getWord(props.keyword).then((words: Array<string>) => {
      setWords(words);
      // 开启渐变更新，本质就是低优先级的更新
      //   startTransition(() => setWords(words));
      // 有了useDeferredValue  可以无需手动startTransition
    });
  }, [props.keyword]);
  return (
    <ul>
      {words.map((word: string) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  );
}

export default function () {
  const [keyword, setKeyword] = useState<string>("");
  const deferredText = useDeferredValue(keyword);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  return (
    <div>
      请输入关键字
      <input value={keyword} onChange={handleChange} />
      {/* <Suggestions keyword={keyword} /> */}
      <Suggestions keyword={deferredText} />
    </div>
  );
}