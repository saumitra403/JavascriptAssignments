function toRoman(num) {
    var ans = "";
    while(num>0){
        if(num>=4 && num<5){
            ans+="IV";
            num-=4;
            continue;
        }
        if(num>=9 && num<10){
            ans+="IX";
            num-=9;
            continue;
        }
        if(num>=40 && num<50){
            ans+="XL";
            num-=40;
            continue;
        }
        if(num>=90 && num<100){
            ans+="XC";
            num-=90;
            continue;
        }
        if(num>=400 && num<500){
            ans+="CD";
            num-=400;
            continue;
        }
        if(num>=900 && num<1000){
            ans+="CM";
            num-=900;
            continue;
        }
        if(num>=1000){
            ans+='M';
            num-=1000;
        }
        else if(num>=500 && num<1000){
            ans+='D';
            num-=500;
        }
        else if(num>=100 && num<500){
            ans+='C';
            num-=100;
        }
        else if(num>=50 && num<100){
            ans+='L';
            num-=50;
        }
        else if(num>=10 && num<50){
            ans+='X';
            num-=10;
        }
        else if(num>=5 && num<10){
            ans+='V';
            num-=5;
        }
        else if(num>=1 && num<5){
            ans+='I';
            num-=1;
        }
    }
    return ans;
}

function printIntegerAndRoman(num,printIntegerAndRoman) {
    console.log(num + " : " + printIntegerAndRoman(num));
}


printIntegerAndRoman(19,toRoman);