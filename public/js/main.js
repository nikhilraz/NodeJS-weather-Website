const place=document.getElementById("place");
const cityCountry=document.getElementById("city_country");
const submitBtn=document.getElementById("submit_btn");
const spanNode=document.getElementById("span_text");
const dayNode=document.getElementById("day");
const todayDate=document.getElementById("today_date");
const weathercon=document.getElementById("temp_status");
const hideData=document.querySelector(".middle_layer");

const getCurrentDay=()=>{
    var d = new Date();
    var weekday = [];
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[d.getDay()];
};
const getCurrentDate=()=>{
    var month=[];
    month[0]="Jan";
    month[1]="Feb";
    month[2]="Mar";
    month[3]="Apr";
    month[4]="May";
    month[5]="Jun";
    month[6]="Jul";
    month[7]="Aug";
    month[8]="Sep";
    month[9]="Oct";
    month[10]="Nov";
    month[11]="Dec";
    var ct=new Date();
    var mon=month[ct.getMonth()];
    var day=ct.getDate();
    var hrs=ct.getHours();
    var mns=ct.getMinutes();
    var period="AM";
    if(hrs>=12){
        period="PM";
        hrs-=12;
    }
    if(mns<10){
        mns="0"+mns;
    }
    return day+" "+mon;
};

const getWeatherCond=(tempStatus)=>{
    if(tempStatus=="Clear"){
        weathercon.innerHTML="<i class='fal fa-sun' style='color:#eccc68'></i>";
    }
    else if(tempStatus=="Clouds"){
        weathercon.innerHTML="<i class='fal fa-cloud' style='color:#f1f2f6'></i>";
    }
    else if(tempStatus=="Rainy"){
        weathercon.innerHTML="<i class='fal fa-cloud-rain' style='color:#a4b0be'></i>";
    }
    else{
        weathercon.innerHTML="<i class='fal fa-cloud' style='color:#44c3de'></i>";
    }
};

dayNode.innerText=getCurrentDay();
todayDate.innerText=getCurrentDate();

const getInfo=async (event)=>{
    event.preventDefault();
    let _place=place.value;
    if(_place==""){
        cityCountry.innerText="Please Enter place name first";
        hideData.classList.add("data_hide");
    }
    else{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${_place}&appid=f3ff4c23d027ed834c0ff60bcd863821`;
            let readableStreamData=await fetch(url);
            let jsonArrayData=[await readableStreamData.json()];
            const temperature=jsonArrayData[0].main.temp;
            const city=jsonArrayData[0].name;
            const country=jsonArrayData[0].sys.country;
            const weather=jsonArrayData[0].weather[0].main;
            cityCountry.innerText=city+", "+country;
            spanNode.innerText=(temperature-273.15).toFixed(2);
            getWeatherCond(weather);
           // hideData.style.visibility="visible";
            console.log(jsonArrayData);
            hideData.classList.remove('data_hide');
        } catch (error) {
            cityCountry.innerText="Please Enter Valid place name";
            hideData.classList.add("data_hide");
        }
    }
};
// `https://api.openweathermap.org/data/2.5/weather?q=${req.query.place}&appid=f3ff4c23d027ed834c0ff60bcd863821`
submitBtn.addEventListener('click',getInfo);