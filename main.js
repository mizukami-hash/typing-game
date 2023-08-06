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
  const easyBtn = document.querySelector("#existingListEasy");
  const hardBtn = document.querySelector("#existingListHard");
  const myListBtn = document.querySelector("#myList");
  const clearBtn = document.querySelector("#clearBtn");
  const form = document.querySelector("#form");
  const gameArea = document.querySelector("#gameArea");
  let loc = 0;

  let words1 = ["red", "blue", "pink"];
  let word;

  function setWord() {
    word = words1.splice(Math.floor(Math.random() * words1.length), 1)[0];
    target.textContent = word;
    loc = 0;
    target.style.fontSize = "30px";
    target.classList.remove("finished");
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
          target.textContent = "Finished!";
          target.classList.add("finished");
          return;
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
      p.textContent = form.value;

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
}
