window.addEventListener("DOMContentLoaded",async () => {
  //getCategories()
  let categoryObjs = new Array(6);
  let clueObjs = new Array();
  categoryObjs = await fetchCategories();
  for(let i = 0; i < 6; i++){
    let catId = categoryObjs[i].id;
    let innerArr = await fetchClues(catId);
    clueObjs.push(innerArr);
  }
  console.log(categoryObjs,clueObjs);
});

async function fetchCategories(){
  let res = await fetch('https://jservice.io/api/categories/?count=6');
  let data = await res.json();
  return data;
}

async function fetchClues(catId){
  let res = await fetch(`https://jservice.io/api/clues/?category=${catId}`);
  let data = await res.json();
  if(data.length === 5) return data;
  if(data.length > 5){
    return data.filter((_,i) => {
      return i % 2 === 1
    })
  } else {
    handleError();
  }
}

// async function getCategories(){
//   let res = await fetch('https://jservice.xyz/api/categories');
//   if(res.ok){
//     let data = await res.json();
//     let categoryObjsList = new Array(6);
//     for(let i = 0; i < 6; i++){
//       let randomNum = Math.floor(Math.random() * 40986);
//       categoryObjsList[i] = data.categories[randomNum];
//     }
//     // console.log(categoryObjsList);
//     setCatVisual(categoryObjsList);
//     // console.log(categoryObjsList[0].id);
//     getClues(categoryObjsList);
//   } else {
//     handleError();
//   }
// }

// function setCatVisual(catObjsList){
//   let catEles = document.querySelectorAll('.category');
//   for(let i = 0; i < catObjsList.length; i++){
//     // console.log(catEles[i], catObjsList[i]);
//     catEles[i].innerText = catObjsList[i].title;
//   }
// }

// async function getClues(catObjsList){
//   let catId = catObjsList[0].id;
//   let clueObjsList = [];
//   let res = await fetch(`https://jservice.io/api/clues/?category=${catId}`);
//   if(res.ok){
//     console.log(res);
//     let data = await res.json();
//     console.log(data);
//     let count = 0;
//     while(clueObjsList.length < 5){
//       // console.log(data, data.categoryId, catId, data.categoryId === catId);
//       clueObjsList.push(data[count]);
//       count++;
//     }
//     console.log(clueObjsList);
//     updateClueVisual(clueObjsList);
//   }
// }

// function updateClueVisual(clueObjsList){
//   let columnEle = document.querySelector('[data-column-num="0"]');
//   let clueEles = columnEle.children;
//   console.log(clueEles);
//   for(let i = 0; i < clueObjsList.length; i++){
//     clueEles[i].innerText = `$${clueObjsList[i].value}`;
//   }
// }

function handleError(){
  alert('Something went wrong.Please try again.');
}
