
const Base_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.11.26/v1/currencies";
const dropdown =document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr =document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg =document.querySelector(".msg");

/*for (code in countryList){
    console.log(code,countryList[code]);
}*/
for(let select of dropdown){
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";

        }else if(select.name === "To" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}
const updateFlag =(element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    /*to  access image now we will do following  select ke parent mei*/
     let img = element.parentElement.querySelector("img");
     img.src =newSrc;
};

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();/*the default work of form will not happen only our custom work*/
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;/*to print the amount value*/
    if(amtVal === ""|| amtVal<1){
        amtVal = 1;
        amount.value = 1;
    }

    
    console.log(amtVal);

console.log(fromCurr.value.toLowerCase() , toCurr.value.toLowerCase());
let response = await fetch(`${Base_URL}/${fromCurr.value.toLowerCase()}.json`);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
console.log(data);

let finalAmount =amtVal *rate;
msg.innerText =`${amtVal}  ${fromCurr.value} = ${finalAmount}  ${toCurr.value}`;
}
)


