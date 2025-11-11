'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener( //イベント検知設定の追加
  'click', //クリックイベント
  () => {
    const userName = userNameInput.value; //入力欄(input)の値取得
    if (userName.length === 0){ //空欄だった場合
      return; //関数処理終了
    }
    //診断エリアの作成
    resultDivision.innerText = ''; //divタグを空文字列で上書き

    // headerDivision の作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    //x投稿ボタン追加
    tweetDivision. innerText = ''; //Tweetのdivタグを空に
    const anchor = document.createElement('a'); //aタグの作成
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue); //属性href追加
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result); //診断結果追加
    anchor.innerText = 'Tweet #あなたのいいところ'; //

    tweetDivision.appendChild(anchor); //divの子要素として追加

    const script = document.createElement('script'); //scriptタグ作成
    script.setAttribute('src' , 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script); //divタグの子要素として追加
  }
);

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)

const answers =[
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
*/
function assessment(userName) {
  // 全文字のコード番号を足し合わせる
  let sumOFCharCode = 0; //文字コードの合計を取っておく変数
  for (let i = 0; i < userName.length; i++) { //各文字のコードを導き合算 
    sumOFCharCode += userName.charCodeAt(i); 
  };
  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index =sumOFCharCode % answers.length; //入力した名前のコード合算÷配列の長さの余り
  let result = answers[index]; //出た数値を配列の番号に照合
  
  result = result.replaceAll('###userName###' , userName)
  return result;  
}

