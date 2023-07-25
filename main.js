"use strict";

{
  //   // タブの切り替え=================================
  const menuItems = document.querySelectorAll(".menu li a");
  const contents = document.querySelectorAll(".content");
  let myList = [];

  menuItems.forEach((clickedItem) => {
    clickedItem.addEventListener("click", (e) => {
      // aタグのページ遷移を無効に
      e.preventDefault();

      menuItems.forEach((item) => {
        item.classList.remove("active");
      });
      clickedItem.classList.add("active");

      contents.forEach((content) => {
        content.classList.remove("active");
      });
      document.getElementById(clickedItem.dataset.id).classList.add("active");
    });
  });
  //   // =================================================

  const target = document.querySelector("#target");
  // document.querySelector("#target2");
  const easyBtn = document.querySelector("#existingListEasy");
  const hardBtn = document.querySelector("#existingListHard");
  const myListBtn = document.querySelector("#myList");
  const clearBtn = document.querySelector("#clearBtn");
  const form = document.querySelector("#form");
  const gameArea = document.querySelector("#gameArea");
  const text = document.querySelector("#start");
  let loc = 0;
  let isActive = false;
  // if(gameArea.classList.contains("active")){
  //   console.log("contain");
  // }

  let words1 = ["red", "blue", "pink"];
  let word;

  if (gameArea.classList.contains("active")) {
    console.log("contain");
  }

  function setWord() {
    // タブ選択状態なら
    word = words1.splice(Math.floor(Math.random() * words1.length), 1)[0];
    target.textContent = word;
    loc = 0;
    target.style.fontSize = "30px";
    // target.style.overflow = "wrap";
    text.textContent = "Please press the displayed keys";
  }

  document.addEventListener("keydown", (e) => {
    if (gameArea.classList.contains("active")) {
      if (e.key !== word[loc]) {
        return;
      }
      loc++;
      target.textContent = "_".repeat(loc) + word.substring(loc);

      if (loc === word.length) {
        if (words1.length === 0) {
          document.querySelector("#text").textContent = "Finished!";
        }
        setWord();
      }
    }
  });

  easyBtn.addEventListener("click", () => {
    words1 = [
      "red",
      "blue",
      "pink",
      "admit",
      "actor",
      "alert",
      "april",
      "below",
      "flower",
      "coffee",
      "sun",
      "mouse",
      "cat",
    ];
    if (gameArea.classList.contains("active")) {
      setWord();
    }
  });
  hardBtn.addEventListener("click", () => {
    words1 = [
      "absentminded",
      "anachronism",
      "buckminsterfullerene",
      "circumlocution",
      "counterintelligence",
      "contextualization",
      "dendrochronology",
      "earthshattering",
    ];
    if (gameArea.classList.contains("active")) {
      setWord();
    }
  });
  myListBtn.addEventListener("click", () => {
    const newList = JSON.parse(localStorage.getItem("myWords"));
    words1 = newList;
    if (localStorage.length === 0) {
      target.textContent = 'Please make a list at "MyList"';
      target.style.fontSize = "24px";
    }
    if (gameArea.classList.contains("active")) {
      setWord();
    }
  });

  // 文字の登録
  addBtn.addEventListener("click", () => {
    if (form.value !== "") {
      // 単語をliとして追加
      const li = document.createElement("li");
      const p = document.createElement("p");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "checkbox";
      checkbox.name = "toDelete";
      p.textContent = form.value;

      li.appendChild(checkbox);
      li.appendChild(p);

      document.querySelector("#lists").appendChild(li);

      let newWord = form.value;
      myList.push(newWord);

      localStorage.setItem("myWords", JSON.stringify(myList));

      form.value = "";
    }
  });

  window.addEventListener("load", () => {
    const words = JSON.parse(localStorage.getItem("myWords"));
    words1 = words;

    Object.keys(words).forEach((element) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "checkbox";
      checkbox.name = "toDelete";

      li.appendChild(checkbox);
      li.appendChild(p);
      p.textContent = words[element];
      document.querySelector("#lists").appendChild(li);
    });
  });

  clearBtn.addEventListener("click", () => {
    const ul = document.querySelector("#lists");
    const li = document.querySelectorAll("#lists > li");
    li.forEach((item) => {
      ul.removeChild(item);
    });
    localStorage.clear("myWords");
  });

  // 入力が終わったら次の文字をセット
  //   function setWord() {
  //     word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
  //     target.textContent = word;
  //     loc = 0;
  //   }

  //   let words = ["red", "blue", "pink"];
  //   const wordsEasy =["ball","auto","book","card","cook","sun","name","me","air"];
  //   // const hard =["specialist","specialist","starvation","subjective","announcement",
  // // "authenticity","bibliography"];
  //   let word;
  //   let loc = 0;
  //   let isPlaying = false;
  // //   let jsonString;

  //   const target = document.getElementById("target");
  //   const form = document.querySelector("#form");
  //   const addBtn = document.querySelector("#addBtn");

  //   // My listへの単語の登録
  //   addBtn.addEventListener("click", () => {
  //     if(form.value !== ''){
  //       // 単語をliとして追加
  //     const li = document.createElement("li");
  //     const p = document.createElement("p");
  //     const checkbox = document.createElement("input");
  //     checkbox.type = "checkbox";
  //     checkbox.id="checkbox";
  //     checkbox.name = "toDelete"
  //     p.textContent = form.value;

  //     li.appendChild(checkbox);
  //     li.appendChild(p);
  //     // ul
  //     document.querySelector("#lists").appendChild(li);
  //     words.push(form.value);
  //     localStorage.setItem("words", JSON.stringify(words));
  //     form.value = "";
  //     }
  //   });

  //   window.addEventListener("load", () => {
  //     const words = JSON.parse(localStorage.getItem("words"));
  //     Object.keys(words).forEach((element) => {
  //       const li = document.createElement("li");
  //       const p = document.createElement("p");
  //       const checkbox = document.createElement("input");
  //       checkbox.type = "checkbox";
  //       checkbox.id="checkbox";
  //       checkbox.name = "toDelete"

  //       li.appendChild(checkbox);
  //       li.appendChild(p);
  //       p.textContent = words[element];
  //       document.querySelector("#lists").appendChild(li);
  //     });
  //   });
  //     // .forEach((element) => {
  //       //  });

  //  words = JSON.parse(localStorage.getItem("words"));

  //     word = words[Math.floor(Math.random() * words.length)];
  //     target.textContent = word;

  //   document.addEventListener("keydown", (e) => {
  //     // 違う文字が入力されたら返す
  //     if (e.key !== word[loc]) {
  //       return;
  //     }
  //     loc++;
  //     target.textContent = "_".repeat(loc) + word.substring(loc);

  //     if (loc === word.length) {
  //       if (words.length === 0) {
  //         const result = document.getElementById("result");
  //         result.textContent = "Finished";
  //       }
  //     }
  //     if (loc === word.length) {
  //       setWord();
  //     }
  //   });
  // // 削除
  //   function deleteRow() {
  //     const checkedList = document.querySelectorAll("input[name =toDelete]:checked");

  //     if (checkedList.length === 0) {
  //       return;
  //     }
  //     if (!confirm("削除しますか？")) {
  //       return;
  //     }

  //     checkedList.forEach((check) => {
  //       check.closest("li").remove()
  //       localStorage.removeItem("words");
  //     });

  //   }

  //   document.querySelector("#deleteBtn").addEventListener("click",()=>{
  //     deleteRow();
  //   });

  //   const myList = document.querySelector("#myList");

  // // ul
  //   const easy = document.querySelector("#easy");
  //   const hard = document.querySelector("#hard");

  //   // tab1のリスト変更ボタン
  //   const changeListBtn =document.querySelector("#easyList");

  // changeListBtn.addEventListener('click',()=>{
  //   target.textContent =

  // });

  // document.addEventListener("keydown",e=>{
  //   const target = document.getElementById("target");
  //   target.textContent = e.key;

  // });
}
