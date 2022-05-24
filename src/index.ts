import "./style.css";

const message: string = "Hei Maailma! Ja Äiti";
console.log(message);

const title: HTMLHeadingElement = document.createElement("h1");
title.classList.add("hello");
title.innerText = "Hei Maailma";

document.getElementById("root").appendChild(title);
