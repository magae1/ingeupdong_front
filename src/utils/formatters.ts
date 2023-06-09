import _ from "underscore";

export const numWithDot = (num: number) => {
  let arr = num.toString().split("");
  let result = new Array<string>();
  let index = 1;
  while (true) {
    result.push(arr.pop() ?? "");
    if (_.isEmpty(arr)) break;
    if (index % 3 === 0) result.push(",");
    index++;
  }
  return result.reverse().join("");
};

export const shortenNum = (num: number) => {
  if (num === 0) return num.toString();
  let exp = 0;
  let set = [
    {
      tail: "억",
      offset: Math.pow(10, 8),
    },
    {
      tail: "만",
      offset: Math.pow(10, 4),
    },
    {
      tail: "천",
      offset: Math.pow(10, 3),
    },
    {
      tail: "백",
      offset: Math.pow(10, 2),
    },
    {
      tail: "",
      offset: Math.pow(10, 0),
    },
  ];
  while (true) {
    let tmp = Math.floor(num / set[exp].offset);
    if (exp >= set.length - 1 || tmp > 0) {
      num = tmp;
      break;
    }
    exp += 1;
  }
  return numWithDot(num) + set[exp].tail;
};
