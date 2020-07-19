window.addEventListener("DOMContentLoaded",async () => {
  let categoryObjs = new Array(6);
  let clueObjs = new Array();
  categoryObjs = await fetchCategories();
  // console.log(categoryObjs);
  for(let i = 0; i < 6; i++){
    let catId = categoryObjs[i].id;
    let innerArr = await fetchClues(catId);
    clueObjs.push(innerArr);
  }
  // console.log(clueObjs);
  generateVisual(categoryObjs, clueObjs);

  let columnEles = document.querySelectorAll('.column');
  let gameBoard = document.querySelector('.game-board');
  for(let columnEle of columnEles){
    columnEle.addEventListener('click', e => {
      if(e.target.innerText !== '') handleClueClick(e, clueObjs, gameBoard);
    });
  }
});

function clearClueValue(columnNum, rowNum){
  let columnEle = document.querySelectorAll('.column')[columnNum];
  let clueEle = columnEle.children[rowNum];
  clueEle.innerText = '';
}

function handleClueClick(clickEvent, clueObjs, gameBoard){
  let outerIdx = clickEvent.target.parentElement.dataset.columnNum;
  let innerIdx = clickEvent.target.dataset.rowNum;
  let currClueObj = clueObjs[outerIdx][innerIdx];
  gameBoard.classList.add('game-board--hidden');
  let questionDiv = document.createElement('div');
  questionDiv.innerText = currClueObj.question;
  questionDiv.setAttribute('id', 'question');
  document.body.append(questionDiv);
  setTimeout(() => {
    // debugger;
    questionDiv.remove();
    gameBoard.classList.remove('game-board--hidden');
    clearClueValue(outerIdx, innerIdx);
  }, 1000);
  // console.log(e.target, e.target.parentElement);
  // console.log(innerIdx, outerIdx);
  console.log(clueObjs[outerIdx][innerIdx]);
}

async function fetchCategories(){
  const catObjs = [];
  for(let i = 0; i < 6; i++){
    let catObj = await fetchCategory(i + 3);
    // console.log(catObj, ...catObj);
    catObjs.push(...catObj);
  }
  return catObjs;
}

async function fetchCategory(num){
  let res = await fetch(`https://jservice.io/api/categories/?offset=${num}`);
  // let res = await fetch(`https://jservice.io/api/clues/?max_date=2014-12-24T12:00:00.000Z&&?min_date=2014-12-24T12:00:00.000Z`)
  if(res.ok){
    let data = await res.json();
    // console.log(data);
    return data;
  } else {
    handleError();
  }
}

async function fetchClues(catId){
  let res = await fetch(`https://jservice.io/api/clues/?category=${catId}`);
  if(res.ok){
    let data = await res.json();
    if(data.length === 5) return data;
    if(data.length > 5){
      // console.log(data);
      return data.filter((_,i) => {
        return i % 2 === 1
      })
    } else {
      handleError();
    }
  } else {
    handleError();
  }
}

function generateVisual(catObjs, clueObjs){
  generateCatVisual(catObjs);
  for(let i = 0; i < catObjs.length; i++){
    generateClueVisual(i, clueObjs);
  }
  // for(let i = 0; i < 1; i++){
  //   generateClueVisual(i, clueObjs);
  // }
}

function generateCatVisual(catObjs){
  // console.log(catObjs);
  let catEles = document.querySelectorAll('.category');
  for(let i = 0; i < catObjs.length; i++){
    // console.log(catEles[i], catObjsList[i]);
    catEles[i].innerText = catObjs[i].title;
  }
}

function generateClueVisual(index, clueObjs){
  // console.log(clueObjs[index]);
  let columnEle = document.querySelector(`[data-column-num="${index}"]`);
  let clueEles = columnEle.children;
  // console.log(columnEle, clueEles, clueObjs);
  for(let i = 0; i < clueObjs[index].length; i++){
    // console.log(clueObjs[i]);
    clueEles[i].innerText = `$${clueObjs[index][i].value}`;
  }
}

function handleError(){
  alert('Something went wrong.Please try again.');
}
