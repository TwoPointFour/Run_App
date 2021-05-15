console.log(document.getElementById("train_time").value)

const train_time= document.getElementById("train_time");
const train_name= document.getElementById("fname");
const weight_name= document.getElementById("weight");
const submit_Btn= document.getElementById("submit_Btn");
const target_time = document.getElementById("target_time");


console.log("Hi", train_name.value, train_time.value)

submitBtn.onclick = function(){
    if (train_name && train_time && target_time){
        const name_key = train_name.value;
        const train_time = train_time.value;
        const target_time = target_time.value;

        const user = new DB.default(name_key, train_time, target_time);
        console.log(user)
        }
    else{
        console.log("No Data!");
        }
    };