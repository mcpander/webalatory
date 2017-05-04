/**
 * Created by McPander on 01.05.2017.
 */
'use strict'
var events = JSON.parse(localStorage['events'] || {});
window.addEventListener('load',function(){
    var userPic = document.querySelector('.user-pic img');
    var userPicContainer = document.querySelector('.user-pic');
    var userHaircut = document.querySelector('.user-haircut');
    var haircuts = document.querySelectorAll('.haircut img');
    var size = document.getElementById('size');
    var date = document.getElementById('date');
    var time = document.getElementById('time');
    var btn = document.getElementById('addToList');
    btn.onclick = function(){
        if(date.value != '' && time.value != ''){
            if(!events[+new Date(date.value)]){
                events[+new Date(date.value)] = {};
            }
            events[+new Date(date.value)][time.value] = true;
            localStorage['events'] = JSON.stringify(events);
            var str = '';
            for(var i = 1;i<=10;i++){
                if(!events[+new Date(date.value)] || !events[+new Date(date.value)][i]){
                    str += '<option value="'+i+'">'+(9+i)+':00</option>';
                }
            }
            alert('Вы записанны на стрижку на '+new Date(date.value).toLocaleDateString()+' на'+(time.value+9)+':00!')
            time.innerHTML = str;
        }else{
            alert('Выберите дату и время!')
        }
    }
    haircuts.forEach(function(h){
        h.addEventListener('click',function(e){
            userHaircut.innerHTML = '<img src="'+e.target.src+'"/>';
        })
    });
    size.addEventListener('change',function(event){
        userHaircut.querySelector('img').style.width = (event.target.value*100)+'%';
    });
    date.addEventListener('change',function(event){
        var str = '';
        if(event.target.value != ''){
            for(var i = 1;i<=10;i++){
                if(!events[+new Date(event.target.value)] || !events[+new Date(event.target.value)][i]){
                    str += '<option value="'+i+'">'+(9+i)+':00</option>';
                }
            }
        }
        time.innerHTML = str;
    });
    userPic.addEventListener('click',function(){
        var loader = document.createElement('input');
        loader.setAttribute('type','file');
        loader.setAttribute('accept','image/*');
        loader.addEventListener('change',function(event){
            loadImg(event.target.files[0] || false).then(
                function(url){
                    userPic.src = url;
                }
            ).catch(
                function(err){
                    alert('Ошибка загрузги');
                }
            );
        });
        loader.click();
    });
    function move(dx,dy){
        return function(event){
            if(event.clientX-dx-userPicContainer.getBoundingClientRect().left > 0){
                userHaircut.style.top = (event.clientY-dy)+'px';
                userHaircut.style.left = (event.clientX-dx-userPicContainer.getBoundingClientRect().left)+'px';
            }
        }
    }
    var m;
    userHaircut.addEventListener('mousedown',function(event){
        m = move(event.clientX-userHaircut.getBoundingClientRect().left,event.clientY-userHaircut.getBoundingClientRect().top);
        document.addEventListener('mousemove',m);
    });
    document.addEventListener('mouseup',function(){
        document.removeEventListener('mousemove',m);
    });
    userHaircut.addEventListener('mouseup',function(){
        document.removeEventListener('mousemove',m);
    });
});

function loadImg(file){
    var fr = new FileReader();
    var promise = new Promise(function(res,rej){
        if(!file){
            rej(false);
        }
        fr.onload = function(event){
            res(event.target.result)
        }
        fr.onerror = function(){
            rej(false)
        }
        fr.readAsDataURL(file);
    });
    return promise;
}